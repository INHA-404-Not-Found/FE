import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";

const MyPostListItem = ({ post, handleModalPress }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.postImgWrapper}>
        <Image
          source={require("../assets/defaultPostImg.png")}
          style={styles.postImg}
        ></Image>
      </View>
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <View style={styles.postState}>
            <Text style={styles.postStateText}>{post.state}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 4,
          }}
        >
          <Text style={styles.LocationText}>{post.location}</Text>
          <Text style={styles.LocationText}>{post.date}</Text>
        </View>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.postContent}>
          {post.content}
        </Text>
      </View>
      <Pressable onPress={handleModalPress} style={styles.postMenuBtn}>
        <Image
          source={require("../assets/postMenu.png")}
          style={styles.postMenuImg}
        ></Image>
      </Pressable>
    </View>
  );
};

export default MyPostListItem;

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEAEA",
    paddingVertical: 13,
  },
  postImgWrapper: {
    width: 90,
    height: 90,
    overflow: "hidden",
  },
  postImg: {
    width: "100%",
    height: "100%",
  },
  postTitle: {
    fontSize: 14,
    fontWeight: "regular",
  },
  LocationText: {
    fontSize: 10,
    fontWeight: "light",
    color: "#a8a8a8",
    marginRight: 10,
  },
  postContent: {
    fontSize: 10,
    fontWeight: "light",
  },
  postState: {
    borderRadius: 15,
    width: 46,
    height: 20,
    borderWidth: 1,
    borderColor: "#EA580C",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  postStateText: {
    fontSize: 10,
    color: "#EA580C",
  },
  postMenuBtn: {
    alignItems: "center",
    width: 30,
    height: 30,
  },
  postMenuImg: {
    width: 20,
    height: 20,
  },
});
