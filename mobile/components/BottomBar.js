import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const BottomBar = () => {
    const navigation = useNavigation(); 

    return (
    <View style={styles.bar}>
        {/* 내가 올린 글 */}
        <Pressable
            onPress={() => navigation.navigate("MyPostListScreen")}
        >
            <Image
                source={require("../assets/myPost.png")}
                style={styles.image}
            ></Image>
        </Pressable>

        {/* 게시글 등록 */}
        <Pressable
            onPress={() => navigation.navigate("AddPostScreen")}
        >
            <Image
            source={require("../assets/addPost.png")}
            style={styles.image}
            ></Image>
        </Pressable>

        
        {/* 모든 게시글 리스트 */}
        <Pressable
            onPress={() => navigation.navigate("PostListScreen")}
        >
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20, 

    position: "absolute",
    width: '100%',
    bottom: 0,
  },
  image: {
    width: 40,
    height: 40,
    marginHorizontal: 35,
    marginVertical: 10,
    resizeMode: "contain",
  }
});
