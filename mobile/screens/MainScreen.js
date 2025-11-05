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
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomBar from "../components/BottomBar";
import CategoryList from "../components/CategoryList";
import DefaultHeader from "../components/DefaultHeader";
import LocationMap from "../components/LocationMap";
import PostTypeSelector from "../components/PostTypeSelector";
const MainScreen = () => {
  const navigation = useNavigation();
  const [selectType, setSelectType] = useState("category"); // category location status
  const [postType, setPostType] = useState("acquired"); // ALL FIND LOST
  const [selectedCate, setSelectedCate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchText, setSearchText] = useState("");
  // bottomSheet
  const bottomSheetModalRef = useRef(null);
  const handleModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("bottomSheetChanges", index);
  }, []);
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1, paddingBottom: 0 }} edge={["top"]}>

          <DefaultHeader />
          
            <View style={styles.contentTop}>
              <View style={styles.searchBar}>
                <TextInput
                  value={searchText}
                  onChangeText={(text) => setSearchText(text)}
                  placeholder="검색어 없음"
                  placeholderTextColor="#ffffffff"
                  style={styles.textInput}
                />
                <Pressable>
                  <Image
                    source={require("../assets/searchWhite.png")}
                    style={styles.barImg}
                  ></Image>
                </Pressable>
              </View>
              <View style={styles.selectView}>
                <PostTypeSelector
                  postType={postType}
                  setPostType={setPostType}
                />
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
                <ScrollView>
                  <View>
                    {selectType === "category" && (
                      <CategoryList
                        selected={selectedCate}
                        setSelected={setSelectedCate}
                      />
                    )}
                    {selectType === "location" && (
                      <LocationMap
                        selected={selectedLocation}
                        setSelected={setSelectedLocation}
                      />
                    )}
                  </View>
                </ScrollView>
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
              <View style={styles.bottomModalContentTitle}>
                <Pressable onPress={() => navigation.navigate("AddPostScreen")}>
                  <Text style={styles.bottomModalContentTitleText}>
                    습득 게시글 등록
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => navigation.navigate("AddLostPostScreen")}
                >
                  <Text style={styles.bottomModalContentTitleText}>
                    분실 게시글 등록
                  </Text>
                </Pressable>
              </View>
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
    height: 590,
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
    padding: 20,
    paddingTop: 10,
  },
  bottomModalContentTitle: {
    alignItem: "center",
    padding: 10,
  },
  bottomModalContentTitleText: {
    fontSize: 18,
    fontWeight: 600,
    paddingBottom: 20,
  },

  contentBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff", // 배경색 지정 (투명하면 밑이 비칠 수 있음)
    zIndex: 10,
  },
});
