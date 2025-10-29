import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
} from "react-native";
import React from "react";

const DefaultHeader = () => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <View>
          <Image
            source={require("../assets/prev.png")}
            style={styles.headerPrevImg}
          ></Image>
        </View>
        <View>
          <Text style={styles.headerText}>게시글 목록</Text>
        </View>
        <View>
          <Image
            source={require("../assets/search.png")}
            style={styles.headerSearchImg}
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
