import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import DefaultHeader from "../components/DefaultHeader";
import Notification from "../components/Notification";

const NOTIFICATIONS = [
  {
    id: "1",
    title: "올리신 분실물과 유사한 습득물을 발견하였습니다!",
    message: "게시글 ‘검정색 지갑 분실하였습니다.’에 대한 유사 습득물 보러가기",
    link: "",
    isRead: "",
  },
  {
    id: "2",
    title: "올리신 분실물과 유사한 습득물을 발견하였습니다!",
    message: "게시글 ‘검정색 지갑 분실하였습니다.’에 대한 유사 습득물 보러가기",
    link: "",
    isRead: "",
  },
  {
    id: "3",
    title: "올리신 분실물과 유사한 습득물을 발견하였습니다!",
    message: "게시글 ‘검정색 지갑 분실하였습니다.’에 대한 유사 습득물 보러가기",
    link: "",
    isRead: "",
  },
  {
    id: "4",
    title: "올리신 분실물과 유사한 습득물을 발견하였습니다!",
    message: "게시글 ‘검정색 지갑 분실하였습니다.’에 대한 유사 습득물 보러가기",
    link: "",
    isRead: "",
  },
  {
    id: "5",
    title: "올리신 분실물과 유사한 습득물을 발견하였습니다!",
    message: "게시글 ‘검정색 지갑 분실하였습니다.’에 대한 유사 습득물 보러가기",
    link: "",
    isRead: "",
  },
  {
    id: "6",
    title: "올리신 분실물과 유사한 습득물을 발견하였습니다!",
    message: "게시글 ‘검정색 지갑 분실하였습니다.’에 대한 유사 습득물 보러가기",
    link: "",
    isRead: "",
  },
  {
    id: "7",
    title: "올리신 분실물과 유사한 습득물을 발견하였습니다!",
    message: "게시글 ‘검정색 지갑 분실하였습니다.’에 대한 유사 습득물 보러가기",
    link: "",
    isRead: "",
  },
  {
    id: "8",
    title: "올리신 분실물과 유사한 습득물을 발견하였습니다!",
    message: "게시글 ‘검정색 지갑 분실하였습니다.’에 대한 유사 습득물 보러가기",
    link: "",
    isRead: "",
  },
  {
    id: "9",
    title: "올리신 분실물과 유사한 습득물을 발견하였습니다!",
    message: "게시글 ‘검정색 지갑 분실하였습니다.’에 대한 유사 습득물 보러가기",
    link: "",
    isRead: "",
  },
  {
    id: "10",
    title: "올리신 분실물과 유사한 습득물을 발견하였습니다!",
    message: "게시글 ‘검정색 지갑 분실하였습니다.’에 대한 유사 습득물 보러가기",
    link: "",
    isRead: "",
  },
  {
    id: "11",
    title: "올리신 분실물과 유사한 습득물을 발견하였습니다!",
    message: "게시글 ‘검정색 지갑 분실하였습니다.’에 대한 유사 습득물 보러가기",
    link: "",
    isRead: "",
  },
];

const NotificationListScreen = () => {
  const [filter, setFilter] = useState("all"); // all read yet

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultHeader />
      <View style={styles.filterBtnContainer}>
        <Pressable
          style={[
            styles.filterBtn,
            { backgroundColor: filter === "all" ? "#d9d9d9" : "white" },
          ]}
        >
          <Text style={[styles.BtnText]}>전체</Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterBtn,
            { backgroundColor: filter === "read" ? "#d9d9d9" : "white" },
          ]}
        >
          <Text style={[styles.BtnText, {}]}>읽음</Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterBtn,
            { backgroundColor: filter === "yet" ? "#d9d9d9" : "white" },
          ]}
        >
          <Text style={[styles.BtnText, {}]}>안 읽음</Text>
        </Pressable>
      </View>
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Notification notification={item} />}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 2 }}
      />
    </SafeAreaView>
  );
};

export default NotificationListScreen;

const styles = StyleSheet.create({
  filterBtn: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#dbdbdb",
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 13,
    marginRight: 8,
  },
  filterBtnContainer: {
    flexDirection: "row",
    padding: 15,
  },
});
