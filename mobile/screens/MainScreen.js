import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Image,
  Pressable,
  Text,
} from "react-native";
import React, { useState } from "react";
import DefaultHeader from "../components/DefaultHeader";
import CategoryList from "../components/CategoryList";
import PostTypeSelector from "../components/PostTypeSelector";

const MainScreen = () => {
  const [selectType, setSelectType] = useState("category"); // category location status
  const [postType, setPostType] = useState("all"); // acquired lost all

  return (
    <SafeAreaView>
      <DefaultHeader />
      <ScrollView>
        <View style={styles.contentTop}>
          <View style={styles.searchBar}>
            <Image
              source={require("../assets/menu.png")}
              style={styles.barImg}
            ></Image>
            <TextInput
              placeholder="검색어 없음"
              placeholderTextColor="#ffffffff"
              style={styles.textInput}
            />
            <Image
              source={require("../assets/searchWhite.png")}
              style={styles.barImg}
            ></Image>
          </View>
          <View style={styles.selectView}>
            <PostTypeSelector postType={postType} setPostType={setPostType} />
            <View>
              <Pressable style={[styles.filterResetBtn]}>
                <Image
                  source={require("../assets/filterReset.png")}
                  style={styles.resetImg}
                ></Image>
                <Text style={[styles.BtnText, { color: "#a8a8a8" }]}>
                  필터 초기화
                </Text>
              </Pressable>
            </View>
            <View style={styles.selectBtnRow}>
              <Pressable
                style={[
                  styles.selectBtn,
                  {
                    backgroundColor:
                      selectType === "category" ? "#D9D9D9" : "#ffffff",
                  },
                ]}
              >
                <Text style={styles.BtnText}>물품 카테고리</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.selectBtn,
                  {
                    backgroundColor:
                      selectType === "location" ? "#D9D9D9" : "#ffffff",
                  },
                ]}
              >
                <Text style={styles.BtnText}>습득/분실 위치</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.selectBtn,
                  {
                    backgroundColor:
                      selectType === "status" ? "#D9D9D9" : "#ffffff",
                  },
                ]}
              >
                <Text style={styles.BtnText}>완료 여부</Text>
              </Pressable>
            </View>
            <View>
              <CategoryList />
            </View>
          </View>
        </View>
        <View style={styles.contentBottom}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  contentTop: {
    flexDirection: "column",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#DADEE7",
  },
  searchBar: {
    width: 345,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2165A6",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  barImg: {
    margin: 5,
    width: 48,
    height: 48,
  },
  textInput: {
    width: 230,
  },
  selectView: {
    width: 345,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderBlockColor: "#DADEE7",
    marginTop: 25,
    padding: 5,
  },

  filterResetBtn: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: 25,
    padding: 4,
  },
  resetImg: {
    width: 15,
    height: 15,
  },
  selectBtnRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: "space-between",
  },
  selectBtn: {
    borderRadius: 25,
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  BtnText: {
    fontSize: 13,
  },
});
