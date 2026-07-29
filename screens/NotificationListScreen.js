import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../api/api.js";
import DefaultHeader from "../components/DefaultHeader";
import Notification from "../components/Notification";

const NotificationListScreen = () => {
  const [filter, setFilter] = useState("all"); // all read yet
  const [pageNo, setPageNo] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const isFocused = useIsFocused();
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const PAGE_SIZE = 10;
  useEffect(() => {
    const fetchNotificationList1 = async () => {
      if (pageNo > 1 && !hasNext) return;
      setLoading(true);
      try {
        const res = await api.get(`/notifications`, {
          params: { page: pageNo },
        });
        setNotifications((prev) => [...prev, ...res.data]);
        setHasNext(res.data.length === PAGE_SIZE);
        console.log("알림목록 조회 성공: ", res.data);
      } catch (e) {
        console.error("알림 목록 불러오기 실패: ", e);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationList1();
  }, [pageNo]);

  const onEndReached = () => {
    if (loading || !hasNext) return; // 중복/무한루프 방지
    setPageNo((p) => p + 1);
  };

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
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <DefaultHeader />
      
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => `${index}-${item.notificationId}`}
        renderItem={({ item }) => <Notification notification={item} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>

  );
};

export default NotificationListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  flatListContent: {
    paddingVertical: 8,
  },
});
