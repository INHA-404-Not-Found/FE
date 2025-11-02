import Picker from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import DefaultHeader from "../components/DefaultHeader";
const AddPostScreen = () => {
  // DropDownPicker 상태 관리
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const categoryList = useSelector((state) => state.category.categories);
  const [items, setItems] = useState(
    categoryList.map((c) => ({
      label: c.name,
      value: c.id,
    }))
  );
  // Picker 상태 관리
  const locationList = useSelector((state) => state.location.locations);
  const [locationId, setLocationId] = useState(null);
  const [locationDetail, setLocationDetail] = useState("");

  const [title, setTitle] = useState("");
  const [storedLocation, setStoredLocation] = useState("");
  const [content, setContent] = useState("");
  const [isPersonal, setIsPersonal] = useState(false);
  const togglePersonalSwitch = () => setIsPersonal((prev) => !prev);

  const [isSN, setIsSN] = useState(false);
  const [studentId, setStudentId] = useState("");
  const toggleSwitch = () => setIsSN((prev) => !prev);
  return (
    <SafeAreaView style={{ flex: 1 }} edge={["top"]}>
      <DefaultHeader />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.flexRow}>
            <Text style={styles.textLabel}>제목</Text>
            <TextInput
              value={title}
              onChangeText={(text) => setTitle(text)}
              style={styles.inputText}
            />
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
              value={studentId}
              onChangeText={(text) => setStudentId(text)}
            ></TextInput>
          </View>
          <View style={styles.flexRow}>
            <DropDownPicker
              open={open}
              value={categories}
              items={items}
              setItems={setItems}
              setOpen={setOpen}
              setValue={setCategories}
              multiple={true} // 여러 개 선택 가능
              min={0}
              max={5} // 최대 5개 선택
              placeholder="카테고리를 선택하세요"
              mode="BADGE"
            />
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.textLabel}>습득 장소</Text>
            <Picker
              selectedValue={locationId}
              onValueChange={(v) => setLocationId(v)}
              dropdownIconColor="#888"
            >
              <Picker.Item label={placeholder} value="" enabled={false} />
              {locationList.map((c) => (
                <Picker.Item key={String(c.id)} label={c.name} value={c.id} />
              ))}
            </Picker>
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
          <View style={styles.flexRow}>
            <Text style={styles.textLabel}>공개/비공개</Text>
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
