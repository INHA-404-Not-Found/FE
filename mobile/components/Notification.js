import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Notification = ({ notification }) => {
  return (
    <View style={styles.container}>
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
    </View>
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
