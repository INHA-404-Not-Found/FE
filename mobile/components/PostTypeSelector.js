import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const PostTypeSelector = ({ postType, setPostType }) => {
  return (
    <View style={styles.postTypeSelector}>
      <Pressable
        style={[
          styles.postTypeBtn,
          {
            borderBottomWidth: postType === "acquired" ? 1 : 0,
            borderColor: "black",
            borderStyle: "solid",
          },
        ]}
        onPress={() => setPostType("acquired")}
      >
        <Text style={styles.BtnText}>습득</Text>
      </Pressable>
      <Pressable
        style={[
          styles.postTypeBtn,
          {
            borderBottomWidth: postType === "lost" ? 1 : 0,
            borderColor: "black",
            borderStyle: "solid",
          },
        ]}
        onPress={() => setPostType("lost")}
      >
        <Text style={styles.BtnText}>분실</Text>
      </Pressable>
      <Pressable
        style={[
          styles.postTypeBtn,
          {
            borderBottomWidth: postType === "all" ? 1 : 0,
            borderColor: "black",
            borderStyle: "solid",
          },
        ]}
        onPress={() => setPostType("all")}
      >
        <Text style={styles.BtnText}>전체</Text>
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
    paddingVertical: 3,
  },
});
