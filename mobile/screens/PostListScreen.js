import {
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
import { getAllPosts, getPostsByKeyword, getPostsByTags } from "../api/post";
import CategoryList from "../components/CategoryList";
import DefaultHeader from "../components/DefaultHeader";
import PostListItem from "../components/PostListItem";
import PostTypeSelector from "../components/PostTypeSelector";
import SearchHeader from "../components/SearchHeader";
const PostListScreen = () => {
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
  const [postType, setPostType] = useState("ALL"); // ALL FIND LOST
  const [category, setCategory] = useState(null);
  const [location, setLocation] = useState(null);
  const [state, setState] = useState(""); // "" UNCOMPLETED COMPLETED POLICE
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  // 필터들을 하나로 묶어 의존성/비교 단순화
  const filters = useMemo(
    () => ({ postType, state, location, category }),
    [postType, state, location, category]
  );

  // 필터 바꿀때마다 페이지넘버 1로 초기화
  useEffect(() => {
    setPageNo(1);
    setHasNext(true);
    setPosts([]);
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
  // 페이징넘버 바뀔 때 마다 호출.
  const fetchPostList = () => {
    console.log("fetchPostList 호출됨 (페이징: ", pageNo, ")");
    if (pageNo > 1 && !hasNext) return;
    const isDefault =
      !filters.state &&
      !filters.location &&
      !filters.category &&
      filters.postType === "ALL";
    (async () => {
      setLoading(true);
      try {
        if (isSearching) {
          await handleSearch();
        } else if (isDefault) {
          await getAllPosts(setPosts, pageNo, hasNext, setHasNext);
        } else {
          await getPostsByTags(
            setPosts,
            pageNo,
            filters.state,
            filters.postType,
            filters.location,
            filters.category,
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

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1 }} edge={["top"]}>
          {isSearching ? (
            <SearchHeader onSubmit={handleSearch} />
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
              <Pressable
                onPress={() => setState("UNCOMPLETED")}
                style={[styles.filterBtn]}
              >
                <Text style={[styles.BtnText, { color: "#a8a8a8" }]}>
                  미완료
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setState("COMPLETED")}
                style={[styles.filterBtn]}
              >
                <Text style={[styles.BtnText, { color: "#a8a8a8" }]}>완료</Text>
              </Pressable>
              <Pressable
                onPress={() => setState("POLICE")}
                style={[styles.filterBtn]}
              >
                <Text style={[styles.BtnText, { color: "#a8a8a8" }]}>
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
              style={styles.bottomSheetModal}
            >
              <BottomSheetView style={styles.contentContainer}>
                <View style={styles.bottomModalContentTitle}>
                  <Text style={styles.bottomModalContentTitleText}>
                    물품 카테고리
                  </Text>
                </View>
                <CategoryList selected={category} setSelected={setCategory} />
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
