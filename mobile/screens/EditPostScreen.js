import React, { useEffect, useState } from "react";
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
import { getPost } from "../api/post";
import DefaultHeader from "../components/DefaultHeader";
import { toImageSource } from "../utils/imageSource";

const EditPostScreen = ({ route }) => {
  const [postId, setPostId] = useState(route.params);
  const [post, setPost] = useState([]);
  useEffect(() => {
    getPost(setPost, postId);
  }, []);
  const imageSource = toImageSource(post?.imagePath);
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
  const [locationOpen, setLocationOpen] = useState(false);
  const locationList = useSelector((state) => state.location.locations);
  const [locationItems, setLocationItems] = useState(
    locationList.map((l) => ({
      label: l.name,
      value: l.id,
    }))
  );
  const [locationId, setLocationId] = useState(null);
  const [locationDetail, setLocationDetail] = useState("");

  const [title, setTitle] = useState(post.title);
  const [storedLocation, setStoredLocation] = useState(post.storedLocation);
  const [content, setContent] = useState(post.content);
  const [isSN, setIsSN] = useState(post.isPersonal);
  const [studentId, setStudentId] = useState(post.studentId);
  const toggleSwitch = () => {
    setIsSN((prev) => !prev);
    if (!isSN) {
      studentId = "";
    }
  };

  const [file, setFile] = useState(post.imagePath); // [{ uri, fileName, mimeType }] 형태로 보관
  // mimeType 추정
  const guessMime = (uri) => {
    const ext = uri.split(".").pop()?.toLowerCase();
    if (ext === "png") return "image/png";
    if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
    if (ext === "heic") return "image/heic";
    return "image/jpeg";
  };
  /*
  const pickImages = async () => {
    // 갤러리 접근 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("사진 접근 권한이 필요합니다");
      return;
    }

    // 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // 여러장 선택 가능
      allowEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // assets: { uri, fileName?, mimeType? }
      const next = result.assets.map((a, idx) => {
        const fileName =
          a.fileName ??
          `photo_${Date.now()}_${idx}.${a.uri.split(".").pop() || "jpg"}`;
        const mimeType = a.mimeType ?? guessMime(a.uri);
        return { uri: a.uri, fileName, mimeType };
      });
      setFile(next);
    }
  };*/

  const handleUpload = async () => {
    try {
      const id = await uploadPost(); // 대기해서 postId 확보
      console.log("post업로드성공");
      if (file.length > 0) {
        await uploadImages(id, file); // id를 명시적으로 전달
      }
      console.log("업로드 전체 완료");
      // 네비게이션 이동
      navigation.navigate("PostScreen", { postId });
    } catch (e) {
      console.error("업로드 실패:", e?.response?.status, e?.message);
    }
  };
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
            <Text style={styles.textLabel}>물품 카테고리</Text>
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
              style={styles.dropdownPicker}
            />
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.textLabel}>습득 장소</Text>
            <DropDownPicker
              open={locationOpen}
              value={locationId}
              items={locationItems}
              setItems={setLocationItems}
              setOpen={setLocationOpen}
              setValue={setLocationId}
              multiple={false}
              placeholder="장소를 선택하세요"
              mode="BADGE"
              style={styles.dropdownPicker}
            />
            <TextInput
              placeholder="(선택)세부 장소를 입력하세요"
              style={[styles.inputText, { width: 100 }]}
              value={locationDetail}
              onChangeText={(text) => setLocationDetail(text)}
            ></TextInput>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.textLabel}>보관 위치</Text>
            <TextInput
              value={storedLocation}
              onChangeText={(text) => setStoredLocation(text)}
              style={styles.inputText}
            ></TextInput>
          </View>
          <View style={[styles.flexRow, { alignItems: "flex-start" }]}>
            <Text style={[styles.textLabel, { marginTop: 15 }]}>내용</Text>
            <TextInput
              value={content}
              onChangeText={(text) => setContent(text)}
              style={[styles.inputText, { height: 150 }]}
            ></TextInput>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.textLabel}>사진 등록</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 8 }}
            ></ScrollView>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Pressable onPress={handleUpload} style={styles.loginBtn}>
          <Text style={styles.loginText}>수정하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default EditPostScreen;

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
    position: "absolute",
    bottom: 60,
    width: "100%", // 부모 전체 폭
    alignItems: "center", // 가운데 정렬
  },
  loginBtn: {
    backgroundColor: "#215294",
    paddingVertical: 10,
    borderRadius: 8,
    width: "85%",
    alignItems: "center",
  },
  loginText: {
    color: "white",
    fontSize: 16,
  },
});
