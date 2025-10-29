import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import DefaultHeader from "../components/DefaultHeader";
import PostTypeSelector from "../components/PostTypeSelector";
import MyPostListItem from "../components/MyPostListItem";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import CategoryList from "../components/CategoryList";

const POSTS = [
  {
    id: "1",
    title: "검정색 카드지갑 습득",
    content:
      "하이테크 1층 해동 카페에서 검정색 카드 지갑을 주웠습니다. 2층 사무실에 맡겨놨습니다.",
    location: "하이테크 1층 해동 카페",
    date: "2025.10.07",
    state: "미완료",
    image: require("../assets/defaultPostImg.png"),
  },
  {
    id: "2",
    title: "지갑 분실했습니다",
    content:
      "학생회관 2층에서 지갑을 잃어버렸습니다. 안에는 학생증과 카드가 들어 있습니다.",
    location: "학생회관 2층",
    date: "2025.10.06",
    state: "완료",
    image: require("../assets/defaultPostImg.png"),
  },
  {
    id: "3",
    title: "아이패드 습득",
    content:
      "하이테크 4층 복도에서 아이패드 프로를 주웠습니다. 화면에 '홍길동'이라는 메모가 있습니다.",
    location: "하이테크 4층 복도",
    date: "2025.10.05",
    state: "인계됨",
    image: require("../assets/defaultPostImg.png"),
  },
  {
    id: "4",
    title: "아이패드 습득",
    content:
      "하이테크 4층 복도에서 아이패드 프로를 주웠습니다. 화면에 '홍길동'이라는 메모가 있습니다.",
    location: "하이테크 4층 복도",
    date: "2025.10.05",
    state: "인계됨",
    image: require("../assets/defaultPostImg.png"),
  },
  {
    id: "5",
    title: "아이패드 습득",
    content:
      "하이테크 4층 복도에서 아이패드 프로를 주웠습니다. 화면에 '홍길동'이라는 메모가 있습니다.",
    location: "하이테크 4층 복도",
    date: "2025.10.05",
    state: "인계됨",
    image: require("../assets/defaultPostImg.png"),
  },
  {
    id: "6",
    title: "아이패드 습득",
    content:
      "하이테크 4층 복도에서 아이패드 프로를 주웠습니다. 화면에 '홍길동'이라는 메모가 있습니다.",
    location: "하이테크 4층 복도",
    date: "2025.10.05",
    state: "인계됨",
    image: require("../assets/defaultPostImg.png"),
  },
];

const MyPostListScreen = () => {
  // bottomSheet
  const bottomSheetModalRef = useRef(null);
  const handleModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("bottomSheetChanges", index);
  }, []);

  const [postType, setPostType] = useState("acquired"); // acquired lost all

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <DefaultHeader />
          <View style={styles.listContainer}>
            <PostTypeSelector postType={postType} setPostType={setPostType} />

            <View style={styles.filterBtnContent}>
              <Pressable style={[styles.filterBtn]}>
                <Text style={[styles.BtnText, { color: "#a8a8a8" }]}>
                  미완료
                </Text>
              </Pressable>
              <Pressable style={[styles.filterBtn]}>
                <Text style={[styles.BtnText, { color: "#a8a8a8" }]}>완료</Text>
              </Pressable>
              <Pressable style={[styles.filterBtn]}>
                <Text style={[styles.BtnText, { color: "#a8a8a8" }]}>
                  인계됨
                </Text>
              </Pressable>
            </View>
            <FlatList
              data={POSTS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <MyPostListItem
                  post={item}
                  handleModalPress={handleModalPress}
                />
              )}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: 2 }}
            />
            <BottomSheetModal
              ref={bottomSheetModalRef}
              onChange={handleSheetChanges}
              enableDynamicSizing
              style={styles.bottomSheetModal}
            >
              <BottomSheetView style={styles.contentContainer}>
                <Pressable style={styles.bottomModalBtn}>
                  <Text style={styles.bottomModalBtnText}>게시글 수정</Text>
                </Pressable>
                <Pressable style={styles.bottomModalBtn}>
                  <Text style={styles.bottomModalBtnText}>삭제하기</Text>
                </Pressable>
                <Pressable style={styles.bottomModalBtn}>
                  <Text style={styles.bottomModalBtnText}>상태 변경</Text>
                </Pressable>
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default MyPostListScreen;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 15,
    flex: 1,
  },
  filterResetBtn: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    padding: 4,
  },
  resetImg: {
    width: 15,
    height: 15,
  },
  filterDownBtn: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#dbdbdb",
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    paddingLeft: 13,
    marginRight: 8,
  },
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
  filterDownImg: {
    width: 20,
    height: 26,
    marginLeft: 4,
  },
  filterBtnContainer: {
    paddingVertical: 8,
    flexGrow: 0,
  },
  filterBtnContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomSheetModal: {
    borderRadius: 25,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 10,
  },
  bottomModalContentTitle: {
    borderBottomWidth: 1,
    borderBottomColor: "#d4d4d4",
    alignItems: "center",
    padding: 10,
  },
  bottomModalContentTitleText: {
    fontSize: 18,
    fontWeight: 600,
  },
  bottomModalResetBtn: {
    borderRadius: 10,
    backgroundColor: "#e9e9e9",
    padding: 10,
    flex: 2,
    alignItems: "center",
  },
  bottomModalSubmitBtn: {
    borderRadius: 10,
    backgroundColor: "#2165A6",
    padding: 10,
    flex: 8,
    alignItems: "center",
  },
  bottomModalBtnContainer: {
    flexDirection: "row",
    gap: 14,
  },
  submitBtnText: {
    color: "white",
  },
  locationSelectMask: {
    width: 380,
    height: 230,
    marginVertical: 15,
  },
  locationMapImg: {
    width: "100%",
    height: "100%",
  },
  bottomModalBtn: {
    alignItems: "center",
    padding: 10,
  },
  bottomModalBtnText: {
    fontSize: 18,
    fontWeight: 600,
  },
});
