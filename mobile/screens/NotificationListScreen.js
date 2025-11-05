import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../api/api.js";
import DefaultHeader from "../components/DefaultHeader";
import Notification from "../components/Notification";

const NotificationListScreen = () => {
  const [filter, setFilter] = useState("all"); // all read yet
  const [pageNo, setPageNo] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const PAGE_SIZE = 10;
  useEffect(() => {
    const fetchNotificationList = async () => {
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

    fetchNotificationList();
  }, [pageNo]);
  const onEndReached = () => {
    if (loading || !hasNext) return; // 중복/무한루프 방지
    setPageNo((p) => p + 1);
  };
  return (
    <SafeAreaView style={{ flex: 1 }} edge={["top"]}>
      <DefaultHeader />
      <View style={styles.filterBtnContainer}>
        <Pressable
          onPress={() => setFilter("all")}
          style={[
            styles.filterBtn,
            { backgroundColor: filter === "all" ? "#d9d9d9" : "white" },
          ]}
        >
          <Text style={[styles.BtnText]}>전체</Text>
        </Pressable>
        <Pressable
          onPress={() => setFilter("read")}
          style={[
            styles.filterBtn,
            { backgroundColor: filter === "read" ? "#d9d9d9" : "white" },
          ]}
        >
          <Text style={[styles.BtnText, {}]}>읽음</Text>
        </Pressable>
        <Pressable
          onPress={() => setFilter("yet")}
          style={[
            styles.filterBtn,
            { backgroundColor: filter === "yet" ? "#d9d9d9" : "white" },
          ]}
        >
          <Text style={[styles.BtnText, {}]}>안 읽음</Text>
        </Pressable>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Notification notification={item} />}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.3}
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
