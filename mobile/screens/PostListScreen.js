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
import PostListItem from "../components/PostListItem";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
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

const PostListScreen = () => {
  // bottomSheet
  const bottomSheetCategoryModalRef = useRef(null);
  const handleCategoryModalPress = useCallback(() => {
    bottomSheetCategoryModalRef.current?.present();
  }, []);
  const handleCategorySheetChanges = useCallback((index) => {
    console.log("bottomSheetCategoryChanges", index);
  }, []);
  const bottomSheetLocationModalRef = useRef(null);
  const handleLocationModalPress = useCallback(() => {
    bottomSheetLocationModalRef.current?.present();
  }, []);
  const handleLocationSheetChanges = useCallback((index) => {
    console.log("bottomSheetLocationChanges", index);
  }, []);

  const [postType, setPostType] = useState("acquired"); // acquired lost all

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <DefaultHeader />
          <View style={styles.listContainer}>
            <PostTypeSelector postType={postType} setPostType={setPostType} />
            <View>
              <Pressable style={[styles.filterResetBtn]}>
                <Image
                  source={require("../assets/filterReset.png")}
                  style={styles.resetImg}
                ></Image>
                <Text style={[styles.BtnText, { color: "#a8a8a8" }]}>
                  필터 초기화
                </Text>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterBtnContainer}
              contentContainerStyle={styles.filterBtnContent}
            >
              <Pressable
                onPress={handleCategoryModalPress}
                style={[styles.filterDownBtn]}
              >
                <Text style={[styles.BtnText, { color: "#a8a8a8" }]}>
                  카테고리
                </Text>
                <Image
                  source={require("../assets/downArrow.png")}
                  style={styles.filterDownImg}
                ></Image>
              </Pressable>
              <Pressable
                onPress={handleLocationModalPress}
                style={[styles.filterDownBtn]}
              >
                <Text style={[styles.BtnText, { color: "#a8a8a8" }]}>위치</Text>
                <Image
                  source={require("../assets/downArrow.png")}
                  style={styles.filterDownImg}
                ></Image>
              </Pressable>
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
            </ScrollView>
            <FlatList
              data={POSTS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <PostListItem post={item} />}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: 2 }}
            />
            <BottomSheetModal
              ref={bottomSheetCategoryModalRef}
              onChange={handleCategorySheetChanges}
              style={styles.bottomSheetModal}
            >
              <BottomSheetView style={styles.contentContainer}>
                <View style={styles.bottomModalContentTitle}>
                  <Text style={styles.bottomModalContentTitleText}>
                    물품 카테고리
                  </Text>
                </View>
                <CategoryList />
                <View style={styles.bottomModalBtnContainer}>
                  <Pressable style={styles.bottomModalResetBtn}>
                    <Text>초기화</Text>
                  </Pressable>
                  <Pressable style={styles.bottomModalSubmitBtn}>
                    <Text style={styles.submitBtnText}>적용</Text>
                  </Pressable>
                </View>
              </BottomSheetView>
            </BottomSheetModal>
            <BottomSheetModal
              ref={bottomSheetLocationModalRef}
              onChange={handleLocationSheetChanges}
              style={styles.bottomSheetModal}
            >
              <BottomSheetView style={styles.contentContainer}>
                <View style={styles.bottomModalContentTitle}>
                  <Text style={styles.bottomModalContentTitleText}>위치</Text>
                </View>
                <View style={styles.locationSelectMask}>
                  <Image
                    source={require("../assets/inhaMap.png")}
                    style={styles.locationMapImg}
                  ></Image>
                </View>
                <View style={styles.bottomModalBtnContainer}>
                  <Pressable style={styles.bottomModalResetBtn}>
                    <Text>초기화</Text>
                  </Pressable>
                  <Pressable style={styles.bottomModalSubmitBtn}>
                    <Text style={styles.submitBtnText}>적용</Text>
                  </Pressable>
                </View>
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default PostListScreen;

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
    alignItem: "center",
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
});
