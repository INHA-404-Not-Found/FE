import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import DefaultHeader from "../components/DefaultHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const AddPostScreen = () => {
  const [isSN, setIsSN] = useState(false);
  const toggleSwitch = () => setIsSN((prev) => !prev);
  return (
    <SafeAreaView style={{ flex: 1 }} edge={['top']}>
      <DefaultHeader />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.flexRow}>
            <Text style={styles.textLabel}>제목</Text>
            <TextInput style={styles.inputText}></TextInput>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.textLabel}>학번 정보{"\n"}포함 유무</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#4fda61ff" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isSN}
            />
            <TextInput
              placeholder="학번 8자리"
              style={[
                styles.inputText,
                { width: 200, backgroundColor: isSN ? "#ffffff" : "#f0ededff" },
              ]}
              editable={isSN}
            ></TextInput>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.textLabel}>물품 카테고리</Text>
            <TextInput style={styles.inputText}></TextInput>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.textLabel}>습득 장소</Text>
            <TextInput style={styles.inputText}></TextInput>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.textLabel}>보관 위치</Text>
            <TextInput style={styles.inputText}></TextInput>
          </View>
          <View style={[styles.flexRow, { alignItems: "flex-start" }]}>
            <Text style={[styles.textLabel, { marginTop: 15 }]}>내용</Text>
            <TextInput style={[styles.inputText, { height: 150 }]}></TextInput>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.textLabel}>사진 등록</Text>
            <TextInput></TextInput>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Pressable style={styles.loginBtn}>
          <Text style={styles.loginText}>취소하기</Text>
        </Pressable>
        <Pressable style={styles.loginBtn}>
          <Text style={styles.loginText}>등록하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 100,
  },
  content: {
    marginHorizontal: 30,
    marginVertical: 15,
    flexDirection: "column",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textLabel: {
    fontSize: 13.5,
  },
  inputText: {
    width: 244,
    height: 27,
    fontSize: 13.5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 15,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    position: "absolute",
    bottom: 60,
  },
  loginBtn: {
    backgroundColor: "#215294",
    width: 170,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  loginText: {
    color: "white",
    fontSize: 16,
  },
});
