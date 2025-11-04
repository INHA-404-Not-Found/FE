import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
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
import api from "../api/api";
import DefaultHeader from "../components/DefaultHeader";

const AddPostScreen = () => {
  const navigation = useNavigation();
  const myInfo = useSelector((state) => state.my.info);
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

  const [title, setTitle] = useState("");
  const [storedLocation, setStoredLocation] = useState("");
  const [content, setContent] = useState("");
  const [isPersonal, setIsPersonal] = useState(false);
  const togglePersonalSwitch = () => setIsPersonal((prev) => !prev);

  const [isSN, setIsSN] = useState(false);
  const [studentId, setStudentId] = useState("");
  const toggleSwitch = () => {
    setIsSN((prev) => !prev);
    if (!isSN) {
      studentId = "";
    }
  };

  const [file, setFile] = useState([]); // [{ uri, fileName, mimeType }] 형태로 보관
  // mimeType 추정
  const guessMime = (uri) => {
    const ext = uri.split(".").pop()?.toLowerCase();
    if (ext === "png") return "image/png";
    if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
    if (ext === "heic") return "image/heic";
    return "image/jpeg";
  };

  const pickImages = async () => {
    // 갤러리 접근 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("사진 접근 권한이 필요합니다");
      return;
    }

    // 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true, // 여러장 선택 가능
      allowsEditing: true,
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
  };
  // 폼 데이터 업로드
  const [postId, setPostId] = useState("");
  const uploadPost = async () => {
    const res = await api.post(`/posts`, {
      locationId,
      locationDetail,
      title,
      content,
      storedLocation,
      status: "UNCOMPLETED",
      type: "FIND",
      isPersonal: isSN,
      categories,
      studentId,
    });
    const newPostId = res.data.postId;
    setPostId(newPostId); // state도 갱신
    return newPostId; // 호출자에게 즉시 id를 반환
  };

  // 이미지 업로드
  const registerPostImage = async (targetPostId, files) => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      // 용량 줄이기
      // const img = files[i];
      // const resized = await ImageManipulator.manipulateAsync(
      //   img.uri,
      //   [{ resize: { width: 1024 } }],
      //   { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      // );

      files.forEach((img, i) => {
        formData.append("file", {
          uri: img.uri,
          name: img.fileName || `image_${i}.jpg`,
          type: img.mimeType || "image/jpeg",
        });
      });
    }
    console.log(formData);

    const response = await api.post(`/posts/${targetPostId}/images`, formData);

    console.log("Upload result:", response.data);
    return response.data;
  };

  // const registerPostImage = async (post_id, files) => {
  //   try {
  //     const formData = new FormData();

  //     files.forEach((img, i) => {
  //       formData.append("file", {
  //         uri: img.uri,
  //         name: img.fileName  `image_${i}.jpg`,
  //         type: img.mimeType  "image/jpeg",
  //       });
  //     });

  //     console.log("FormData: ");
  //     for (const pair of formData.entries()) {
  //       console.log(pair[0], pair[1]);
  //     }

  //     const res = await api.post(/posts/${post_id}/images, formData);

  //     console.log("registerPostImage 성공:", res.data);
  //   } catch (err) {
  //     console.error("registerPostImage 에러:", err);
  //     alert("registerPostImage 실패");
  //   }
  // };

  const handleUpload = async () => {
    try {
      const id = await uploadPost(); // 대기해서 postId 확보
      console.log("post업로드성공");
      console.log(file, file.length);

      if (file.length > 0 && file) {
        await registerPostImage(id, file); // id를 명시적으로 전달
      }
      console.log("사진 업로드 전체 완료");

      // 네비게이션 이동
      console.log("postId" + id);
      navigation.navigate("PostScreen", id);
    } catch (e) {
      console.error("업로드 실패:", e);
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
            <Pressable onPress={pickImages} style={styles.imageUploadBtn}>
              <Image
                source={require("../assets/uploadImage.png")}
                style={{
                  width: 15,
                  height: 15,
                  marginRight: 4,
                }}
              />
              <Text style={styles.imageUploadText}>upload</Text>
            </Pressable>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 8 }}
            >
              {file.map((img) => (
                <Image
                  key={img.uri}
                  source={{ uri: img.uri }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    marginRight: 8,
                  }}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>취소하기</Text>
        </Pressable>
        <Pressable onPress={handleUpload} style={styles.btn}>
          <Text style={styles.btnText}>등록하기</Text>
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
    paddingVertical: 0,
    lineHeight: 15,
    fontSize: 12.5,
    textAlignVertical: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 15,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center", // 가운데 정렬
    alignItems: "center",
    marginHorizontal: 30,
    position: "absolute",
    bottom: 60,
  },
  btn: {
    backgroundColor: "#215294",
    width: 160,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 10, // 버튼 사이 간격
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
  dropdownPicker: {
    width: 244,
    borderColor: "#d9d9d9",
  },
  imageUploadBtn: {
    backgroundColor: "#215294",
    width: 90,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  imageUploadText: {
    color: "white",
    fontSize: 10,
    fontWeight: "light",
  },
});
