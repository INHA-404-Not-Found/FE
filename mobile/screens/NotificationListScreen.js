import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../api/api.js";
import DefaultHeader from "../components/DefaultHeader";
import Notification from "../components/Notification";
import { useIsFocused } from "@react-navigation/native";

const NotificationListScreen = () => {
  const [filter, setFilter] = useState("all"); // all read yet
  const [pageNo, setPageNo] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const isFocused = useIsFocused();

  
  useEffect(() => {
    const fetchNotificationList1 = async () => {
      try {
        const res = await api.get(`/notifications`, {
          params: { page: pageNo },
        });
        setNotifications((prev) => [...prev, ...res.data]);
        console.log("알림목록 조회 성공: ", notifications);
      } catch (e) {
        console.error("알림 목록 불러오기 실패: ", e);
      }
    };

    fetchNotificationList1();
  }, [pageNo]);

  // useEffect(() => {
  //   console.log("isFocused test");
  //   const fetchNotificationList2 = async () => {
  //     try {
  //       const res = await api.get(`/notifications`, {
  //         params: { page: pageNo },
  //       });
  //       setNotifications(res.data);
  //       console.log("알림목록 조회 성공: ", notifications);
  //     } catch (e) {
  //       console.error("알림 목록 불러오기 실패: ", e);
  //     }
  //   }

  //   fetchNotificationList2();

  // }, [isFocused])

  return (
    <SafeAreaView style={{ flex: 1 }} edge={["top"]}>
      <DefaultHeader />
      
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => `${index}-{item.notificationId}` }
        renderItem={({ item }) => <Notification notification={item} />}
        onEndReached={() => setPageNo((prev) => prev + 1)} // 스크롤 끝 -> 다음 페이지
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.8}
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
