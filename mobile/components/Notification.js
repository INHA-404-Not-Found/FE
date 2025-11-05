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
            ? "white" : "rgba(190, 222, 243, 0.27)"
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
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryImg: {
    width: 45,
    height: 45,
  },
  nextImg: {
    width: 24,
    height: 24,
  },
  contentText: {
    fontSize: 9,
    fontWeight: "regular",
  },
  contentContainer: {
    paddingHorizontal: 8,
  },
});
