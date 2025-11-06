import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import BottomBar from "../components/BottomBar";
import CategoryList from "../components/CategoryList";
import DefaultHeader from "../components/DefaultHeader";
import LocationViewBox from "../components/LocationViewBox";
import PostTypeSelector from "../components/PostTypeSelector";
import { setKeyword } from "../Redux/slices/keywordSlice";
const MainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const keyword = useSelector((s) => s.search.keyword);
  const [selectType, setSelectType] = useState("category"); // category location status
  const [postType, setPostType] = useState("ALL"); // ALL FIND LOST
  const [selectedCate, setSelectedCate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [state, setState] = useState(""); // "" UNCOMPLETED COMPLETED POLICE
  // bottomSheet
  const bottomSheetModalRef = useRef(null);
  const handleModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("bottomSheetChanges", index);
  }, []);
  // 필터링 초기화
  const resetFilter = () => {
    setSelectedCate([]);
    setSelectedLocation([]);
    setState(""); // "" UNCOMPLETED COMPLETED POLICE
  };
  // state 토글, 업데이트
  const handleState = (v) => {
    if (state == "") {
      setState(v);
    } else {
      setState(state === v ? "" : v);
    }
  };
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView
          style={{ flex: 1, paddingBottom: 0 }}
          edge={["top", "bottom"]}
        >
          <DefaultHeader />

          <View style={styles.contentTop}>
            <View style={styles.searchBar}>
              <TextInput
                value={keyword}
                onChangeText={(text) => dispatch(setKeyword(text))}
                placeholder="검색어 없음"
                placeholderTextColor="#ffffffff"
                style={styles.textInput}
              />
              <Pressable
                onPress={() =>
                  navigation.navigate("PostListScreen", {
                    category: selectedCate,
                    location: selectedLocation,
                    state: state,
                    postType: postType,
                  })
                }
              >
                <Image
                  source={require("../assets/searchWhite.png")}
                  style={styles.barImg}
                ></Image>
              </Pressable>
            </View>
            <View style={styles.selectView}>
              <PostTypeSelector postType={postType} setPostType={setPostType} />
              <View>
                <Pressable
                  onPress={resetFilter}
                  style={[styles.filterResetBtn]}
                >
                  <Image
                    source={require("../assets/filterReset.png")}
                    style={styles.resetImg}
                  ></Image>
                  <Text style={[styles.BtnText, { color: "#a8a8a8" }]}>
                    필터 초기화
                  </Text>
                </Pressable>
              </View>
              <View style={styles.selectBtnRow}>
                <Pressable
                  onPress={() => setSelectType("category")}
                  style={[
                    styles.selectBtn,
                    {
                      backgroundColor:
                        selectType === "category" ? "#D9D9D9" : "#ffffff",
                    },
                  ]}
                >
                  <Text style={styles.BtnText}>물품 카테고리</Text>
                </Pressable>
                <Pressable
                  onPress={() => setSelectType("location")}
                  style={[
                    styles.selectBtn,
                    {
                      backgroundColor:
                        selectType === "location" ? "#D9D9D9" : "#ffffff",
                    },
                  ]}
                >
                  <Text style={styles.BtnText}>습득/분실 위치</Text>
                </Pressable>
                <Pressable
                  onPress={() => setSelectType("status")}
                  style={[
                    styles.selectBtn,
                    {
                      backgroundColor:
                        selectType === "status" ? "#D9D9D9" : "#ffffff",
                    },
                  ]}
                >
                  <Text style={styles.BtnText}>완료 여부</Text>
                </Pressable>
              </View>

              <View>
                {selectType === "category" && (
                  <CategoryList
                    selected={selectedCate}
                    setSelected={setSelectedCate}
                  />
                )}
                {selectType === "location" && (
                  <View style={{ height: 250 }}>
                    <LocationViewBox
                      selected={selectedLocation}
                      setSelected={setSelectedLocation}
                    />
                  </View>
                )}
                {selectType === "status" && (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingVertical: 10,
                      paddingHorizontal: 30,
                    }}
                  >
                    <Pressable
                      onPress={() => handleState("UNCOMPLETED")}
                      style={[
                        styles.filterBtn,
                        {
                          borderColor:
                            state === "UNCOMPLETED" ? "darkGray" : "#a8a8a8",
                          backgroundColor:
                            state === "UNCOMPLETED"
                              ? "#d9d9d9"
                              : "rgba(0,0,0,0)",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.BtnText,
                          {
                            color:
                              state === "UNCOMPLETED" ? "darkGray" : "#a8a8a8",
                          },
                        ]}
                      >
                        미완료
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleState("COMPLETED")}
                      style={[
                        styles.filterBtn,
                        {
                          borderColor:
                            state === "COMPLETED" ? "darkGray" : "#a8a8a8",
                          backgroundColor:
                            state === "COMPLETED" ? "#d9d9d9" : "rgba(0,0,0,0)",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.BtnText,
                          {
                            color:
                              state === "COMPLETED" ? "darkGray" : "#a8a8a8",
                          },
                        ]}
                      >
                        완료
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleState("POLICE")}
                      style={[
                        styles.filterBtn,
                        {
                          borderColor:
                            state === "POLICE" ? "darkGray" : "#a8a8a8",
                          backgroundColor:
                            state === "POLICE" ? "#d9d9d9" : "rgba(0,0,0,0)",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.BtnText,
                          {
                            color: state === "POLICE" ? "darkGray" : "#a8a8a8",
                          },
                        ]}
                      >
                        인계됨
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
              <View style={styles.tagWrap}>
                {selectedCate ? (
                  <View key={selectedCate.id} style={styles.tag}>
                    <Image
                      source={require("../assets/check.png")}
                      style={styles.checkImg}
                    ></Image>
                    <Text style={styles.tagText}>{selectedCate.name}</Text>
                  </View>
                ) : (
                  <Text style={styles.noneText}></Text>
                )}
                {selectedLocation ? (
                  <View key={selectedLocation.id} style={styles.tag}>
                    <Image
                      source={require("../assets/check.png")}
                      style={styles.checkImg}
                    ></Image>
                    <Text style={styles.tagText}>{selectedLocation.name}</Text>
                  </View>
                ) : (
                  <Text style={styles.noneText}></Text>
                )}
                {state ? (
                  <View key={state} style={styles.tag}>
                    <Image
                      source={require("../assets/check.png")}
                      style={styles.checkImg}
                    ></Image>
                    <Text style={styles.tagText}>{state}</Text>
                  </View>
                ) : (
                  <Text style={styles.noneText}></Text>
                )}
              </View>
            </View>
          </View>

          {/* 하단 바 */}
          <View style={styles.contentBottom}>
            <BottomBar handleModalPress={handleModalPress} />
          </View>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            style={styles.bottomSheetModal}
          >
            <BottomSheetView style={styles.contentContainer}>
              <SafeAreaView edges={["bottom"]}>
                <Pressable
                  onPress={() => navigation.navigate("AddPostScreen")}
                  style={({ pressed }) => [
                    styles.bottomModalBtn,
                    { backgroundColor: pressed ? "#f2f6ff" : "#FFFFFF" },
                  ]}
                >
                  <Text style={styles.bottomModalContentTitleText}>
                    습득 게시글 등록
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => navigation.navigate("AddLostPostScreen")}
                  style={({ pressed }) => [
                    styles.bottomModalBtn,
                    { backgroundColor: pressed ? "#f2f6ff" : "#FFFFFF" },
                  ]}
                >
                  <Text style={styles.bottomModalContentTitleText}>
                    분실 게시글 등록
                  </Text>
                </Pressable>
              </SafeAreaView>
            </BottomSheetView>
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  contentTop: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#DADEE7",
  },
  searchBar: {
    width: 345,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2165A6",
    flexDirection: "row",
  },
  barImg: {
    margin: 5,
    marginLeft: 0,
    width: 48,
    height: 48,
  },
  textInput: {
    color: "#fff",
    marginLeft: 20,
    width: 265,
  },
  selectView: {
    width: 345,
    height: 555,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderBlockColor: "#DADEE7",
    marginTop: 25,
    padding: 5,
  },
  filterResetBtn: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    marginLeft: 2,
    padding: 4,
  },
  resetImg: {
    width: 15,
    height: 15,
  },
  selectBtnRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  selectBtn: {
    borderRadius: 25,
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  BtnText: {
    fontSize: 13,
  },
  bottomSheetModal: {
    borderRadius: 25,
  },
  contentContainer: {
    paddingTop: 10,
  },
  bottomModalContentTitle: {
    alignItem: "center",
    padding: 10,
  },
  bottomModalBtn: {
    alignItems: "center",
    padding: 10,
  },
  bottomModalContentTitleText: {
    fontSize: 18,
    fontWeight: 600,
    paddingBottom: 10,
  },
  tagWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingTop: 20,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  checkImg: {
    width: 15,
    height: 10,
    marginRight: 5,
  },
  contentBottom: {
    backgroundColor: "#fff",
    paddingBottom: 10, // 하단 안전 여백 추가
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
});
