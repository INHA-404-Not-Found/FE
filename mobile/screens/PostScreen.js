import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPost } from "../api/post";
import DefaultHeader from "../components/DefaultHeader";
import StatusLabel from "../components/StatusLabel";
import { toImageSource } from "../utils/imageSource";

const PostScreen = (route) => {
  console.log(route.route.params);
  const postId = route.route.params;
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (!postId) return;
    console.log("postId: " + postId);
    getPost(setPost, postId);
  }, [postId]);

  const imageSource = toImageSource(post?.imagePath);
  
  return (
    <SafeAreaView style={styles.safe} edge={["top"]}>
      <DefaultHeader />
      <ScrollView contentContainerStyle={styles.PostContainer}>
        <Image source={imageSource} style={styles.UploadedImg}></Image>
        <View style={styles.ContentContainer}>
          <View style={styles.headerRow}>
            <View style={{ flexShrink: 1, paddingRight: 12 }}>
              <Text style={styles.categoryText}>{post.categories}</Text>
              <Text style={styles.titleText}>{post.title}</Text>
            </View>
            <StatusLabel status={post.status} />
          </View>
          <Text style={styles.categoryText}>{post.createdAt}</Text>
          <View style={styles.infoList}>
            <Text style={styles.infoItem}>
              {"\u2022"} 습득 장소: {post.locationName} {post.locationDetail}
            </Text>
            <Text style={styles.infoItem}>
              {"\u2022"} 보관 위치: {post.storedLocation}
            </Text>
          </View>
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
    height: "100%",
    width: "100%",

    borderRadius: 0,
    backgroundColor: "#F1F5F9",
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
