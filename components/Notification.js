import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { getItem } from "expo-secure-store";
import api from "../api/api";

const Notification = ({ notification }) => {
  console.log("notification" + notification.link);
  const navigation = useNavigation();
  
  return (
    <Pressable
      style={[
        styles.container, 
        { 
          backgroundColor: notification.isRead 
            ? "white" : "#dadee7"
        }
      ]}
      onPress={async () => {
        try {
          const res = await api.get(notification.link);

          // 알림 읽음 처리 -> 안 읽은 것에 대해서만
          if(!notification.isRead){
            const res2 = await api.patch(`notifications/${notification.notificationId}/read`);
            console.log("res2.data" + res2.data);
          }
          

          console.log("getPost: ", res.data);
          navigation.navigate("PostScreen", res.data.postId );

        } catch (err) {
          console.error("알림 클릭 에러:", err);
        }
      }}
    >
      <Image
        source={require("../assets/walletF.png")}
        style={styles.categoryImg}
      ></Image>
      <View style={styles.contentContainer}>
        <Text>{notification.title}</Text>
        <Text numberOfLines={2} style={styles.contentText}>
          {notification.message}
        </Text>
      </View>
      <View>
        <Image
          source={require("../assets/nextArrow.png")}
          style={styles.nextImg}
        ></Image>
      </View>
    </Pressable>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  categoryImg: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
    color: "#333",
  },
  contentText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
  },
  nextImg: {
    width: 20,
    height: 20,
    tintColor: "black",
  },
});