import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";


const DefaultHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.name);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => {
            if (route.name != "MainScreen") {
              navigation.goBack();
            } else {
              navigation.navigate("UserScreen")
            }
          }}
        >
          <Image
            source={
              route.name != "MainScreen" ? require("../assets/prev.png") : require("../assets/user.png")
            }
            style={styles.headerPrevImg}
          ></Image>
        </Pressable>
        <View>
          <Text style={styles.headerText}>
            { route.name == "MainScreen" ? "분실물 찾기" : "" }
            { route.name == "AddPostScreen" ? "게시글 등록" : "" }
            { route.name == "Notification" ? "알림함" : "" }
            { route.name == "SettingScreen" ? "설정" : "" }
            { route.name == "UserScreen" ? "마이페이지" : "" }
            { route.name == "PostListScreen" ? "게시글 목록" : "" }
            { route.name == "PostScreen" ? "내 게시글 목록" : "" }  
          </Text>
        </View>
        <View>
          <Image
            source={require("../assets/search.png")}
            style={[
              styles.headerSearchImg,
              route.name === "UserScreen" && { opacity: 0 },
            ]}
          ></Image>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DefaultHeader;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 7,
    alignItems: "center",
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.29)",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "medium",
    color: "#1C63B7",
  },
  headerPrevImg: {
    width: 25,
    height: 25,
  },
  headerSearchImg: {
    width: 48,
    height: 48,
  },
});
