import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPost } from "../api/post";
import DefaultHeader from "../components/DefaultHeader";
import StatusLabel from "../components/StatusLabel";
import { toImageSource } from "../utils/imageSource";
import { DateFormat } from "../utils/DateFormat";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const PostScreen = (route) => {
  console.log("PostScreen의 route.route.params = postId: " + route.route.params);
  const postId = route.route.params;
  const [post, setPost] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!postId) return;
    console.log("postId: " + postId);
    getPost(setPost, postId);
  }, [postId]);

  const handleScroll = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.safe} edge={["top"]}>
      <DefaultHeader />
      <ScrollView contentContainerStyle={styles.PostContainer}>
        {/* 이미지 슬라이드 */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageScroll}
          onScroll={handleScroll}
        >
          {Array.isArray(post.imagePath) && post.imagePath.length > 0 ? (
            post.imagePath.map((img, index) => {
              const fullUri = `https://lost-inha.kro.kr${img}`;
              return (
                <Image
                  key={index}
                  source={{ uri: fullUri }}
                  style={[styles.UploadedImg, { width: screenWidth }]}
                  resizeMode="cover"
                />
              );
            })
          ) : (
            <View style={[styles.UploadedImg, styles.noImageBox]}>
              <Text style={styles.noImageText}>이미지가 없습니다</Text>
            </View>
          )}
        </ScrollView>

        {/* 하단 이미지 갯수 표시 */}
        {Array.isArray(post.imagePath) && post.imagePath.length > 1 && (
          <View style={styles.imageCountBox}>
            <Text style={styles.imageCountText}>
              {currentIndex + 1}/{post.imagePath.length}
            </Text>
          </View>
        )}

        {/* 게시물 내용 */}
        <View style={styles.ContentContainer}>
          <View style={styles.headerRow}>
            <View style={{ flexShrink: 1, paddingRight: 12 }}>
              <Text style={styles.categoryText}>{post.categories?.join(",  ") || "카테고리 없음"}</Text>
              <Text style={styles.titleText}>{post.title}</Text>
            </View>
            <StatusLabel status={post.status} />
          </View>
          <Text style={styles.categoryText}>{DateFormat(post.createdAt)}</Text>
          {post.type === "FIND" ? (
            <View style={styles.infoList}>
              {post.locationName && (
                <Text style={styles.infoItem}>
                  {"\u2022"} 습득 장소: {post.locationName}{" "}
                  {post.locationDetail}
                </Text>
              )}
              {post.storedLocation && (
                <Text style={styles.infoItem}>
                  {"\u2022"} 보관 위치: {post.storedLocation}
                </Text>
              )}
            </View>
          ) : (
            <View style={styles.infoList}>
              {post.locationName && (
                <Text style={styles.infoItem}>
                  {"\u2022"} 분실 장소: {post.locationName}{" "}
                  {post.locationDetail}
                </Text>
              )}
            </View>
          )}

          <Text style={styles.bodyText}>{post.content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  PostContainer: {
    alignSelf: "stretch",
  },
  UploadedImg: {
    width: 410,
    height: 400,
    backgroundColor: "#F1F5F9",
  },
  imageScroll: {
    flexGrow: 0,
  },
  noImageBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  noImageText: {
    color: "#9CA3AF",
    fontSize: 16,
  },
  imageCountBox: {
    position: "absolute",
    top: 10,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  imageCountText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
  ContentContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 13,
    color: "#5B5B5B",
    marginBottom: 3,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "600",
  },
  infoList: {
    marginVertical: 10,
  },
  infoItem: {
    fontSize: 14,
    color: "#374151",
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#1F2937",
    marginTop: 4,
    fontWeight: "500",
  },
});
