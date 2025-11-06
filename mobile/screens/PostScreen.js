import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View, Modal, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPost } from "../api/post";
import DefaultHeader from "../components/DefaultHeader";
import StatusLabel from "../components/StatusLabel";
import { DateFormat } from "../utils/DateFormat";

const screenWidth = Dimensions.get("window").width;

const PostScreen = ({ route }) => {
  const postId = route.params;
  const [post, setPost] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!postId) return;
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* 이미지 슬라이드 */}
        <View style={styles.imageCard}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
          >
            {Array.isArray(post.imagePath) && post.imagePath.length > 0 ? (
              post.imagePath.map((img, index) => {
                const fullUri = `https://lost-inha.kro.kr${img}`;
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setSelectedImage(fullUri);
                      setModalVisible(true);
                    }}
                  >
                    <Image
                      source={{ uri: fullUri }}
                      style={[styles.UploadedImg, { width: screenWidth - 20 }]}
                      resizeMode="cover"
                    />
                  </Pressable>
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
        </View>

        {/* 사진 크게 보는 화면 */}
        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.modalBackground}>
            {/* 닫기 버튼 */}
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Image
                style={styles.closeButtonImage}
                source={require("../assets/close.png")}
              />
            </Pressable>

            <Image
              source={{ uri: selectedImage }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </View>
        </Modal>

        {/* 게시물 내용 */}
        <View style={styles.contentCard}>
          <View style={styles.ContentContainer}>
            <View style={styles.headerRow}>
              <View style={{ flexShrink: 1, paddingRight: 8 }}>
                <Text style={styles.categoryText}>
                  {post.categories?.join(", ") || "카테고리 없음"}
                </Text>
                <Text style={styles.titleText}>{post.title}</Text>
              </View>
              <StatusLabel status={post.status} />
            </View>
            <Text style={styles.categoryText}>{DateFormat(post.createdAt)}</Text>

            <View style={styles.infoList}>
              {post.type === "FIND" && post.locationName && (
                <Text style={styles.infoItem}>
                  {"\u2022"} 습득 장소: {post.locationName} {post.locationDetail}
                </Text>
              )}
              {post.type === "FIND" && post.storedLocation && (
                <Text style={styles.infoItem}>
                  {"\u2022"} 보관 위치: {post.storedLocation}
                </Text>
              )}
              {post.type !== "FIND" && post.locationName && (
                <Text style={styles.infoItem}>
                  {"\u2022"} 분실 장소: {post.locationName} {post.locationDetail}
                </Text>
              )}
            </View>

            <View style={styles.divider} />

            <Text style={styles.bodyText}>{post.content}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F6F7FA",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  imageCard: {
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  UploadedImg: {
    height: 380,
    backgroundColor: "#E5E7EB",
  },
  noImageBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 380,
    width: 400,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  noImageText: {
    color: "#9CA3AF",
    fontSize: 16,
    fontWeight: "500",
  },
  imageCountBox: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  imageCountText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 15,
    zIndex: 2,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 8,
  },
  closeButtonImage: {
    width: 24,
    height: 24,
    tintColor: "#000",
  },
  contentCard: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  ContentContainer: {},
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 13,
    color: "#6B7280",
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
    marginBottom: 3,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#1F2937",
    fontWeight: "500",
  },
});
