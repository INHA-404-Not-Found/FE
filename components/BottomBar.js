import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { TokenStore } from "../TokenStore";

const BottomBar = ({ handleModalPress }) => {
  const navigation = useNavigation();

  // 로그인 여부 확인
  const checkLogin = async (onSuccess) => {
    const token = await TokenStore.getToken();
    console.log("token: " + token);

    if (!token) {
      navigation.navigate("LoginScreen");
    } else {
      onSuccess();
    }
  };

  return (
    <View style={styles.bar}>
      {/* 내가 올린 글 */}
      <Pressable
        onPress={() =>
          checkLogin(() => navigation.navigate("MyPostListScreen"))
        }
      >
        <Image
          source={require("../assets/myPost.png")}
          style={styles.image}
        ></Image>
      </Pressable>

      {/* 게시글 등록 */}
      <Pressable onPress={() => checkLogin(() => handleModalPress())}>
        <Image
          source={require("../assets/addPost.png")}
          style={styles.image}
        ></Image>
      </Pressable>

      {/* 모든 게시글 리스트 */}
      <Pressable onPress={() => navigation.navigate("PostListScreen")}>
        <Image
          source={require("../assets/postList.png")}
          style={styles.image}
        />
      </Pressable>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  image: {
    width: 35,
    height: 35,
    marginHorizontal: 40,
    marginVertical: 9,
    resizeMode: "contain",
  },
});
