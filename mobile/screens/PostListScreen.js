import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  getPostsByKeyword,
  getPostsByKeywordFilter,
  getPostsByTags,
} from "../api/post";
import CategoryList from "../components/CategoryList";
import DefaultHeader from "../components/DefaultHeader";
import LocationViewBox from "../components/LocationViewBox";
import PostListItem from "../components/PostListItem";
import PostTypeSelector from "../components/PostTypeSelector";
import SearchHeader from "../components/SearchHeader";
const PostListScreen = ({ route }) => {
  const {
    category: initialCategory = null,
    location: initialLocation = null,
    state: initialStatus = "", // "" | "UNCOMPLETED" | "COMPLETED" | "POLICE"
    postType: initialPostType = "ALL", // "ALL" | "FIND" | "LOST"
  } = route?.params ?? {};

  // 화면 내부 상태에 반영(필요하면)
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState(initialLocation);
  const [state, setState] = useState(initialStatus);
  const [postType, setPostType] = useState(initialPostType);
  const dispatch = useDispatch();
  const keyword = useSelector((s) => s.search.keyword);
  const isSearching = useSelector((s) => s.search.isSearching);
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1); // 게시물 조회 페이징
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

  // snap points (모달 높이)
  const snapPoints = useMemo(() => ["40%"], []);

  // backdrop 생성 함수
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close" // ← 이게 핵심! 눌렀을 때 닫힘
      />
    ),
    []
  );

  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  // 필터들을 하나로 묶어 의존성/비교 단순화
  const filters = useMemo(
    () => ({ postType, state, location, category }),
    [postType, state, location, category]
  );
  // 페이지넘버 1로 초기화
  const resetPageNo = () => {
    setPageNo(1);
    setHasNext(true);
    setPosts([]);
  };

  // 필터 바꿀때마다 페이지넘버 1로 초기화
  useEffect(() => {
    resetPageNo();
  }, [filters]);

  // 키워드 검색
  const handleSearch = async () => {
    setLoading(true);
    try {
      await getPostsByKeyword(setPosts, keyword, pageNo, setHasNext);
    } catch (e) {
      console.error("키워드 게시물 목록 조회 오류:", e.message);
    } finally {
      setLoading(false);
    }
  };
  // 키워드+필터 검색
  const handleSearchFilter = async () => {
    setLoading(true);
    try {
      await getPostsByKeywordFilter(
        setPosts,
        keyword,
        pageNo,
        state,
        postType,
        location,
        category,
        setHasNext
      );
    } catch (e) {
      console.error("키워드 게시물 목록 조회 오류:", e.message);
    } finally {
      setLoading(false);
    }
  };
  // 페이징넘버 바뀔 때 마다 호출.
  const fetchPostList = () => {
    console.log("fetchPostList 호출됨 (페이징: ", pageNo, ")");
    if (pageNo > 1 && !hasNext) return;
    const isDefault =
      (state === "" || state == null) &&
      location == null &&
      category == null &&
      postType === "ALL";
    (async () => {
      setLoading(true);
      try {
        if (isSearching) {
          if (isDefault) {
            await handleSearch();
          } else {
            await handleSearchFilter();
          }
        } else if (isDefault) {
          await getAllPosts(setPosts, pageNo, hasNext, setHasNext);
        } else {
          await getPostsByTags(
            setPosts,
            pageNo,
            state,
            postType,
            location,
            category,
            hasNext,
            setHasNext
          );
        }
      } catch (e) {
        console.error("게시글 목록 조회 오류:", e.message);
      } finally {
        setLoading(false);
      }
    })();
  };
  useEffect(() => {
    fetchPostList();
  }, [pageNo, filters]);
  const onEndReached = () => {
    if (loading || !hasNext) return; // 중복/무한루프 방지
    setPageNo((p) => p + 1);
  };
  // 필터링 초기화
  const resetFilter = () => {
    setCategory(null);
    setLocation(null);
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
          style={{ flex: 1, backgroundColor: "white" }}
          edge={["top"]}
        >
          {isSearching ? (
            <SearchHeader onSubmit={handleSearch} resetPageNo={resetPageNo} />
          ) : (
            <DefaultHeader />
          )}

          <View style={styles.listContainer}>
            <PostTypeSelector postType={postType} setPostType={setPostType} />
            <View>
              <Pressable onPress={resetFilter} style={[styles.filterResetBtn]}>
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
                style={[
                  styles.filterDownBtn,
                  {
                    borderColor: category ? "darkGray" : "#a8a8a8",
                    backgroundColor: category ? "#d9d9d9" : "rgba(0,0,0,0)",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.BtnText,
                    { color: category ? "darkGray" : "#a8a8a8" },
                  ]}
                >
                  {category ? category.name : "카테고리"}
                </Text>
                <Image
                  source={require("../assets/downArrow.png")}
                  style={styles.filterDownImg}
                ></Image>
              </Pressable>
              <Pressable
                onPress={handleLocationModalPress}
                style={[
                  styles.filterDownBtn,
                  {
                    borderColor: location ? "darkGray" : "#a8a8a8",
                    backgroundColor: location ? "#d9d9d9" : "rgba(0,0,0,0)",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.BtnText,
                    { color: location ? "darkGray" : "#a8a8a8" },
                  ]}
                >
                  {location ? location.name : "위치"}
                </Text>
                <Image
                  source={require("../assets/downArrow.png")}
                  style={styles.filterDownImg}
                ></Image>
              </Pressable>
              <Pressable
                onPress={() => handleState("UNCOMPLETED")}
                style={[
                  styles.filterBtn,
                  {
                    borderColor:
                      state === "UNCOMPLETED" ? "darkGray" : "#a8a8a8",
                    backgroundColor:
                      state === "UNCOMPLETED" ? "#d9d9d9" : "rgba(0,0,0,0)",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.BtnText,
                    {
                      color: state === "UNCOMPLETED" ? "darkGray" : "#a8a8a8",
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
                    borderColor: state === "COMPLETED" ? "darkGray" : "#a8a8a8",
                    backgroundColor:
                      state === "COMPLETED" ? "#d9d9d9" : "rgba(0,0,0,0)",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.BtnText,
                    {
                      color: state === "COMPLETED" ? "darkGray" : "#a8a8a8",
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
                    borderColor: state === "POLICE" ? "darkGray" : "#a8a8a8",
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
            </ScrollView>
            <FlatList
              data={posts}
              keyExtractor={(item) => item.postId}
              renderItem={({ item }) => <PostListItem post={item} />}
              showsVerticalScrollIndicator={false}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.3}
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: 2 }}
            />
            <BottomSheetModal
              ref={bottomSheetCategoryModalRef}
              onChange={handleCategorySheetChanges}
              backdropComponent={renderBackdrop}
              style={styles.bottomSheetModal}
            >
              <BottomSheetView style={styles.contentContainer}>
                <SafeAreaView edges={["bottom"]}>
                  <View style={styles.bottomModalContentTitle}>
                    <Text style={styles.bottomModalContentTitleText}>
                      물품 카테고리
                    </Text>
                  </View>

                  <CategoryList selected={category} setSelected={setCategory} />
                </SafeAreaView>
              </BottomSheetView>
            </BottomSheetModal>
            <BottomSheetModal
              ref={bottomSheetLocationModalRef}
              onChange={handleLocationSheetChanges}
              backdropComponent={renderBackdrop}
              style={styles.bottomSheetModal}
            >
              <BottomSheetView style={styles.contentContainer}>
                <SafeAreaView edges={["bottom"]}>
                  <View style={styles.bottomModalContentTitle}>
                    <Text style={styles.bottomModalContentTitleText}>위치</Text>
                  </View>
                  <LocationViewBox
                    selected={location}
                    setSelected={setLocation}
                  />
                </SafeAreaView>
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
    paddingVertical: 8,
    paddingHorizontal: 12,
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
    flexDirection: "center",
    alignItem: "center",
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
