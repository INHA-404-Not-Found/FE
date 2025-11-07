import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const PostTypeSelector = ({ postType, setPostType }) => {
  return (
    <View style={styles.postTypeSelector}>
      <Pressable
        style={[
          styles.postTypeBtn,
          {
            borderBottomWidth: postType === "ALL" ? 1 : 0,
            borderColor: "black",
            borderStyle: "solid",
          },
        ]}
        onPress={() => setPostType("ALL")}
      >
        <Text style={styles.BtnText}>전체</Text>
      </Pressable>
      <Pressable
        style={[
          styles.postTypeBtn,
          {
            borderBottomWidth: postType === "FIND" ? 1 : 0,
            borderColor: "black",
            borderStyle: "solid",
          },
        ]}
        onPress={() => setPostType("FIND")}
      >
        <Text style={styles.BtnText}>습득</Text>
      </Pressable>
      <Pressable
        style={[
          styles.postTypeBtn,
          {
            borderBottomWidth: postType === "LOST" ? 1 : 0,
            borderColor: "black",
            borderStyle: "solid",
          },
        ]}
        onPress={() => setPostType("LOST")}
      >
        <Text style={styles.BtnText}>분실</Text>
      </Pressable>
    </View>
  );
};

export default PostTypeSelector;

const styles = StyleSheet.create({
  postTypeSelector: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: "space-between",
  },
  postTypeBtn: {
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  BtnText: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
});
