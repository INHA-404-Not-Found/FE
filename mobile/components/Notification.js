import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Notification = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/walletF.png")}
        style={styles.categoryImg}
      ></Image>
      <View>
        <Text>올리신 분실물과 유사한 습득물을 발견하였습니다!</Text>
        <Text numberOfLines={2} style={styles.contentText}>
          게시글 ‘검정색 지갑 분실하였습니다.’에 대한 유사 습득물 보러가기
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
    padding: 5,
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
});
