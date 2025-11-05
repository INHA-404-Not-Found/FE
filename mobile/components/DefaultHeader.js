import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { onIsSearching } from "../Redux/slices/keywordSlice.js";
import { TokenStore } from "../TokenStore.js";
import api from "../api/api.js";

const DefaultHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = TokenStore.getToken();
  const [isNotificationUnread, setIsNotificationUnread] = useState(true); // 안 읽으면 true, 읽으면 false
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchNotificationList = async () => {
      const res = await api.get(`/notifications`, {
        params: { page: 1 },
      });

      if (res.data[0].isRead) setIsNotificationUnread(false);
      else setIsNotificationUnread(true);
    };

    fetchNotificationList();
  }, [token]);

  useEffect(() => {
    console.log(isNotificationUnread);
  }, [isNotificationUnread]);

  // 오른쪽 아이콘
  let imageSource = null;
  switch (route.name) {
    case "MainScreen":
      if (isNotificationUnread) {
        // 안 읽음
        imageSource = require("../assets/alert_exist.png");
      } else {
        // 읽음
        imageSource = require("../assets/alert.png");
      }
      break;
    case "NotificationListScreen":
      imageSource = require("../assets/search.png");
      break;
    default:
      imageSource = require("../assets/search.png");
      break;
  }

  // 오른쪽 아이콘 투명 처리할 화면
  const hideRightImage =
    route.name === "UserScreen" ||
    route.name === "AddPostScreen" ||
    route.name === "AddLostPostScreen" ||
    route.name === "MyPostListScreen" ||
    route.name === "PostScreen" ||
    route.name === "EditPostScreen" ||
    route.name === "NotificationListScreen";

  return (
    <View>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.headerContainer}>
        {/* 왼쪽 아이콘 */}
        <Pressable
          onPress={() => {
            if (route.name !== "MainScreen") {
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
              route.name !== "MainScreen"
                ? require("../assets/prev.png")
                : require("../assets/user.png")
            }
            style={styles.headerImg}
          />
        </Pressable>

        {/* 가운데 텍스트 */}
        <Text style={styles.headerText}>
          {route.name === "MainScreen" && "분실물 찾기"}
          {route.name === "AddPostScreen" && "습득 게시글 등록"}
          {route.name === "AddLostPostScreen" && "분실 게시글 등록"}
          {route.name === "Notification" && "알림함"}
          {route.name === "SettingScreen" && "설정"}
          {route.name === "UserScreen" && "마이페이지"}
          {route.name === "PostListScreen" && "게시글 목록"}
          {route.name === "MyPostListScreen" && "내 게시글 목록"}
          {route.name === "PostScreen" && "게시물"}
          {route.name === "EditPostScreen" && "게시글 수정"}
          {route.name === "NotificationListScreen" && "알림창"}
        </Text>

        {/* 오른쪽 아이콘 */}
        <Pressable
          onPress={() => {
            if (route.name === "MainScreen") {
              navigation.navigate("NotificationListScreen");
            } else if (route.name === "PostListScreen") {
              dispatch(onIsSearching());
            }
          }}
        >
          <Image
            source={imageSource}
            style={[styles.headerImg, hideRightImage && { opacity: 0 }]}
          />
        </Pressable>
      </View>
    </View>
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
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.29)",
  },
  headerText: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1C63B7",
  },
  headerImg: {
    width: 25,
    height: 25,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  searchInput: {
    width: 255,
    height: 47,
    borderRadius: 10,
    backgroundColor: "#DADEE7",
    paddingHorizontal: 15,
  },
});
