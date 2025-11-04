import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { getMyPosts } from "../api/post";
import DefaultHeader from "../components/DefaultHeader";
import MyPostListItem from "../components/MyPostListItem";
import PostTypeSelector from "../components/PostTypeSelector";

const MyPostListScreen = () => {
  const myInfo = useSelector((state) => state.my.info);
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  // bottomSheet
  const bottomSheetModalRef = useRef(null);
  const handleModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("bottomSheetChanges", index);
  }, []);
  const closeModal = () => setDelVisible(false);

  const [postType, setPostType] = useState("acquired"); // acquired lost all
  const [delVisible, setDelVisible] = useState(false); // 삭제 모달 열림/닫힘 상태

  const navigation = useNavigation();
  useEffect(() => {
    getMyPosts(setPosts, pageNo);
  }, [pageNo]);
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1 }} edge={["top"]}>
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
              data={posts}
              keyExtractor={(item) => item.postId}
              renderItem={({ item }) => (
                <MyPostListItem
                  post={item}
                  handleModalPress={handleModalPress}
                />
              )}
              showsVerticalScrollIndicator={false}
              onEndReached={() => setPageNo((prev) => prev + 1)}
              onEndReachedThreshold={0.8}
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
                <Pressable
                  style={styles.bottomModalBtn}
                  onPress={() => navigation.navigate("EditPostScreen")}
                >
                  <Text style={styles.bottomModalBtnText}>게시글 수정</Text>
                </Pressable>
                <Pressable
                  onPress={() => setDelVisible(true)}
                  style={styles.bottomModalBtn}
                >
                  <Text style={styles.bottomModalBtnText}>삭제하기</Text>
                </Pressable>
                <Pressable style={styles.bottomModalBtn}>
                  <Text style={styles.bottomModalBtnText}>상태 변경</Text>
                </Pressable>
              </BottomSheetView>
            </BottomSheetModal>
            <Modal
              visible={delVisible}
              transparent
              animationType="fade"
              onRequestClose={() => setDelVisible(false)}
            >
              <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.overlay}>
                  <TouchableWithoutFeedback>
                    <View style={styles.modalBox}>
                      <Text style={styles.modalTitleText}>
                        게시글을 삭제하시겠어요?
                      </Text>
                      <Text style={styles.modalContentText}>
                        삭제한 게시글은 복구할 수 없습니다.
                      </Text>
                      <View style={styles.modalBtnContainer}>
                        <Pressable
                          onPress={closeModal}
                          style={styles.modalCancelBtn}
                        >
                          <Text style={styles.modalBtnText}>취소</Text>
                        </Pressable>
                        <Pressable style={styles.modalSubmitBtn}>
                          <Text style={styles.modalBtnWhiteText}>삭제</Text>
                        </Pressable>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
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
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "white",
    paddingVertical: 25,
    paddingHorizontal: 45,
    borderRadius: 25,
  },
  modalCancelBtn: {
    borderRadius: 10,
    backgroundColor: "#e9e9e9",
    padding: 8,
    alignItems: "center",
    flex: 1,
  },
  modalSubmitBtn: {
    borderRadius: 10,
    backgroundColor: "#2165A6",
    padding: 8,
    alignItems: "center",
    flex: 1,
  },
  modalBtnText: {
    fontSize: 16,
  },
  modalBtnWhiteText: {
    fontSize: 16,
    color: "white",
  },
  modalBtnContainer: {
    flexDirection: "row",
    gap: 10,
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: 600,
  },
  modalContentText: {
    paddingVertical: 23,
    fontSize: 13,
  },
});
