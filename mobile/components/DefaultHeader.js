import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TokenStore } from "../TokenStore.js";

const DefaultHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.name);

  let imageSource;
  let imageStyle;
  switch (route.name) {
    case "MainScreen":
      imageSource = require("../assets/alert.png");
      imageStyle = styles.headerAlertImg;
      break;
    case "NotificationListScreen":
      imageSource = require("../assets/search.png");
      imageStyle = styles.headerSearchImg;
    default:
      imageSource = require("../assets/search.png");
      imageStyle = styles.headerSearchImg;
      break;
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => {
            if (route.name != "MainScreen") {
              navigation.goBack();
            } else {
              if (TokenStore.getToken() == null) {
                navigation.navigate("LoginScreen");
              } else {
                navigation.navigate("UserScreen");
              }
            }
          }}
        >
          <Image
            source={
              route.name != "MainScreen"
                ? require("../assets/prev.png")
                : require("../assets/user.png")
            }
            style={styles.headerPrevImg}
          ></Image>
        </Pressable>
        <View>
          <Text style={styles.headerText}>
            {route.name == "MainScreen" ? "분실물 찾기" : ""}
            {route.name == "AddPostScreen" ? "게시글 등록" : ""}
            {route.name == "Notification" ? "알림함" : ""}
            {route.name == "SettingScreen" ? "설정" : ""}
            {route.name == "UserScreen" ? "마이페이지" : ""}
            {route.name == "PostListScreen" ? "게시글 목록" : ""}
            {route.name == "MyPostListScreen" ? "내 게시글 목록" : ""}
            {route.name == "PostScreen" ? "게시물" : ""}
            {route.name == "EditPostScreen" ? "게시글 수정" : ""}
            {route.name == "NotificationListScreen" ? "알림창" : ""}
          </Text>
        </View>
        <View>
          <Pressable
            onPress={() => {
              if (route.name == "MainScreen") {
                navigation.navigate("NotificationListScreen");
              } else {
              }
            }}
          >
            <Image
              source={imageSource}
              style={[
                { imageStyle },
                route.name === "UserScreen" && { opacity: 0 },
              ]}
            ></Image>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DefaultHeader;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 7,
    alignItems: "center",
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.29)",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "medium",
    color: "#1C63B7",
  },
  headerPrevImg: {
    width: 25,
    height: 25,
  },
  headerSearchImg: {
    width: 48,
    height: 48,
  },
  headerAlertImg: {
    width: 25,
    height: 25,
  },
});
