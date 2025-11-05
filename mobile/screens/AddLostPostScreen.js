import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import api from "../api/api";
import DefaultHeader from "../components/DefaultHeader";

const AddLostPostScreen = () => {
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
  const [postId, setPostId] = useState(null);
  const uploadPost = async () => {
    const res = await api.post(`/posts`, {
      locationId,
      locationDetail,
      title,
      content,
      status: "UNCOMPLETED",
      type: "LOST",
      categories,
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.textLabel, { marginTop: 13 }]}>제목</Text>
              <Text style={[styles.star, { marginTop: 13 }]}> *</Text>
            </View>
            <TextInput
              value={title}
              onChangeText={(text) => setTitle(text)}
              style={styles.inputText}
            />
          </View>

          <View style={styles.flexRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.textLabel}>물품 카테고리</Text>
              <Text style={styles.star}> *</Text>
            </View>
            <View style={styles.dropdownContainer}>
              <DropDownPicker
                open={open}
                value={categories}
                items={items}
                setItems={setItems}
                setOpen={setOpen}
                setValue={setCategories}
                multiple={true}
                min={0}
                max={5}
                placeholder="카테고리를 선택하세요"
                mode="BADGE"
                style={styles.dropdownPicker}
                zIndex={3000}
                zIndexInverse={1000}
              />
            </View>
          </View>
          <View style={styles.flexRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.textLabel}>분실 장소</Text>
              <Text style={styles.star}> *</Text>
            </View>
            <View style={styles.dropdownContainer}>
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
                zIndex={2000}
                zIndexInverse={900}
              />
              <TextInput
                placeholder="(선택) 세부 장소를 입력하세요"
                style={[styles.inputText]}
                value={locationDetail}
                onChangeText={(text) => setLocationDetail(text)}
              ></TextInput>
            </View>
          </View>

          <View style={styles.flexRow}>
            <Text style={[styles.textLabel, { marginTop: 13 }]}>내용</Text>
            <TextInput
              value={content}
              numberOfLines={5}
              multiline={true}
              onChangeText={(text) => setContent(text)}
              style={[
                styles.inputText,
                {
                  minHeight: 5 * 24,
                  height: "auto",
                  paddingTop: 10,
                  textAlignVertical: "top",
                },
              ]}
            />
          </View>
          <View style={[styles.flexRow, { alignItems: "center" }]}>
            <Text style={styles.textLabel}>사진 등록</Text>
            <Pressable
              onPress={pickImages}
              style={[styles.imageUploadBtn, { marginLeft: 50 }]}
            >
              <Image
                source={require("../assets/uploadImage2.png")}
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
        <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>취소하기</Text>
        </Pressable>
        <Pressable onPress={handleUpload} style={styles.btn}>
          <Text style={styles.btnText}>등록하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddLostPostScreen;

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
    marginBottom: 10,
    alignItems: "flex-start",
  },
  textLabel: {
    fontSize: 13.5,
  },
  star: {
    color: "#fe2828ff",
    fontSize: 13.5,
  },
  inputText: {
    width: 244,
    height: 40,
    paddingVertical: 0,
    lineHeight: 15,
    fontSize: 12.5,
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: 244,
    height: 40,
    paddingVertical: 0,
    fontSize: 12.5,
    borderWidth: 2,
    backgroundColor: "#fff",
    borderColor: "#215294",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 15,
  },
  imageUploadText: {
    color: "#215294",
    fontSize: 13,
  },
});
