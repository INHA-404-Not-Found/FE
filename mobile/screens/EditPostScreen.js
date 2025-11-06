import React, { useEffect, useState } from "react";

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
import { getPost } from "../api/post";
import DefaultHeader from "../components/DefaultHeader";
import { toImageSource } from "../utils/imageSource";

import { useNavigation } from "@react-navigation/native";

import * as ImageManipulator from "expo-image-manipulator";

import { mime } from "react-native-mime-types";
import api from "../api/api";
import { TokenStore } from "../TokenStore";

const EditPostScreen = ({ route }) => {
  const navigation = useNavigation();

  const routePostId = route?.params?.postId ?? route?.params ?? null;
  const [postId, setPostId] = useState(routePostId);

  // post는 객체가 더 적절
  const [post, setPost] = useState(null);

  // form fields (초기값은 빈값; post 로드되면 채움)
  const [title, setTitle] = useState("");
  const [storedLocation, setStoredLocation] = useState("");
  const [content, setContent] = useState("");
  const [isSN, setIsSN] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [file, setFile] = useState([]); // 항상 배열로 처리

  // image preview source helper
  const imageSource = toImageSource(post?.imagePath);

  // DropDownPicker 관련 상태
  const [open, setOpen] = useState(false);
  const categoryList = useSelector((state) => state.category?.categories ?? []);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]); // 선택된 카테고리 값들

  const [locationOpen, setLocationOpen] = useState(false);
  const locationList = useSelector((state) => state.location?.locations ?? []);
  const [locationItems, setLocationItems] = useState([]);
  const [locationId, setLocationId] = useState(null);
  const [locationDetail, setLocationDetail] = useState("");

  // 카테고리/장소 items는 redux 값이 바뀔 때 세팅
  useEffect(() => {
    if (Array.isArray(categoryList)) {
      setItems(
        categoryList.map((c) => ({
          label: c.name,
          value: c.id,
        }))
      );
    }
  }, [categoryList]);

  useEffect(() => {
    if (Array.isArray(locationList)) {
      setLocationItems(
        locationList.map((l) => ({
          label: l.name,
          value: l.id,
        }))
      );
    }
  }, [locationList]);

  // postId가 있으면 post 불러오기
  useEffect(() => {
    if (!postId) return;
    console.log("postId: " + postId);
    getPost(setPost, postId);
  }, [postId]);

  // post가 로드되면 각 form 상태 동기화
  useEffect(() => {
    if (!post) return;
    setTitle(post.title ?? "");
    setStoredLocation(post.storedLocation ?? "");
    setContent(post.content ?? "");
    setIsSN(Boolean(post.isPersonal));
    setStudentId(post.studentId ?? "");
    // imagePath가 문자열이면 배열로, 이미 배열이면 그대로 사용
    if (!post.imagePath) {
      setFile([]);
    } else if (Array.isArray(post.imagePath)) {
      setFile(
        post.imagePath.map((p, idx) =>
          typeof p === "string"
            ? { uri: p, fileName: `image_${idx}.jpg`, mimeType: "image/jpeg" }
            : p
        )
      );
    } else if (typeof post.imagePath === "string") {
      setFile([
        {
          uri: post.imagePath,
          fileName: "image_0.jpg",
          mimeType: "image/jpeg",
        },
      ]);
    } else {
      setFile([]);
    }
    // 카테고리, location 관련 초기값이 있다면 설정
    if (post.categories) setCategories(post.categories);
    if (post.locationId) setLocationId(post.locationId);
    if (post.locationDetail) setLocationDetail(post.locationDetail);
  }, [post]);

  // mimeType 추정 (간단)
  const guessMime = (uri) => {
    const ext = uri.split(".").pop()?.toLowerCase();
    if (ext === "png") return "image/png";
    if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
    if (ext === "heic") return "image/heic";
    return "image/jpeg";
  };

  /*

  // 이미지를 upload를 해야하는지 false => 이미지 변경 안 함. true => 이미지 변경함
  const [changeImage, setChangeImage] = useState(false);

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
      allowsEditing: false,
      quality: 1,
    });
    console.log(result);

  if (!result.canceled) {
      setChangeImage(true);
      let selected = result.assets;

      // 2장까지만 허용
      if (selected.length > 2) {
        alert("최대 2장까지만 선택할 수 있습니다.");
        selected = selected.slice(0, 2);
      }

      const next = selected.map((a, idx) => {
        const fileName =
          a.fileName ??
          `photo_${Date.now()}_${idx}.${a.uri.split(".").pop() || "jpg"}`;
        const mimeType = a.mimeType ?? guessMime(a.uri);
        return { uri: a.uri, fileName, mimeType };
      });

      setFile(next);
    }
  };*/

  const toggleSwitch = () => {
    setIsSN((prev) => {
      const next = !prev;
      if (!next) {
        // 비활성화하면 학번 비움
        setStudentId("");
      }
      return next;
    });
  };

  // 업로드 함수들: 실제 API에 맞춰 구현 필요
  const uploadPost = async () => {
    // 예시 플레이스홀더: 서버에 post 수정/생성 요청 후 id 반환
    // 실제로는 PUT /posts/:id 또는 POST /posts 등으로 구현되어 있을 것
    // 아래는 단순 플레이스홀더
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(postId ?? 12345); // 실제로는 응답에서 postId 받아옴
      }, 300);
    });
  };

  const uploadImage = async (targetPostId, files) => {
    console.log("targetPostId:", targetPostId);

    try {
      const formData = new FormData();

      // 백엔드 @RequestParam("files") → key 이름 반드시 "files"
      for (const img of files) {
        const compressedUri = await compressImage(img.uri);

        formData.append("files", {
          uri: compressedUri,
          name: img.fileName || "photo.jpg",
          type: img.mimeType || mime.getType(img.uri) || "image/jpeg",
        });
      }

      const tok = TokenStore.getToken();
      console.log("token:", tok);

      const res = await api.patch(`/posts/${targetPostId}/images`, formData, {
        headers: {
          Authorization: `Bearer ${tok}`,
          "Content-Type": "multipart/form-data",
        },
        timeout: 20000, // (선택) 업로드 시간이 길면 timeout 추가
      });

      console.log("HTTP status:", res.status);
      console.log("서버 응답:", res.data);
    } catch (err) {
      console.log("에러:", err);
    }
  };

  // 이미지 압축 함수 (이미 있는 함수 그대로 재사용 가능)
  const compressImage = async (uri) => {
    try {
      const result = await ImageManipulator.manipulateAsync(uri, [], {
        compress: 0.5,
        format: ImageManipulator.SaveFormat.JPEG,
      });
      return result.uri;
    } catch (error) {
      console.log("이미지 압축 중 오류:", error);
      return uri;
    }
  };

  const handleUpload = async () => {
    try {
      /*
      const id = await uploadPost(); // post 업데이트/생성해서 id 확보
      console.log("post 업로드 성공, id:", id);
      */
      if (changeImage && file && file.length > 0) {
        console.log(file);
        await uploadImage(postId, file);
      }
      console.log("업로드 전체 완료");

      navigation.navigate("PostScreen", { postId: postId });
    } catch (e) {
      console.error("업로드 실패:", e?.response?.status ?? "", e?.message ?? e);
      alert("업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
      <DefaultHeader />
      {post && (
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
                <Text style={[styles.textLabel, { alignItems: "center" }]}>
                  물품 카테고리
                </Text>
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

            {post.type === "FIND" ? (
              <>
                <View style={styles.flexRow}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.textLabel}>습득 장소</Text>
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
                      style={styles.inputText}
                      value={locationDetail}
                      onChangeText={(text) => setLocationDetail(text)}
                    ></TextInput>
                  </View>
                </View>
                <View style={styles.flexRow}>
                  <Text style={[styles.textLabel, { marginTop: 13 }]}>
                    보관 위치
                  </Text>
                  <TextInput
                    value={storedLocation}
                    onChangeText={(text) => setStoredLocation(text)}
                    style={styles.inputText}
                  />
                </View>
              </>
            ) : (
              <></>
            )}
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
                style={({ pressed }) => [
                  styles.imageUploadBtn,
                  {
                    marginLeft: 50,
                    backgroundColor: pressed ? "#BEDEF3" : "#fff",
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  },
                ]}
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
            </View>

            {(file.length > 0 || post?.imagePath?.length > 0) && (
              <ScrollView
                horizontal
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 8 }}
              >
                {changeImage
                  ? file.map((img, index) => (
                      <Image
                        key={index}
                        source={{ uri: img.uri }}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 8,
                          marginRight: 8,
                        }}
                      />
                    ))
                  : post.imagePath.map((img) => (
                      <Image
                        key={img}
                        source={{ uri: `https://lost-inha.kro.kr${img}` }}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 8,
                          marginRight: 8,
                        }}
                      />
                    ))}
              </ScrollView>
            )}
          </View>
        </ScrollView>
      )}

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

export default EditPostScreen;

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 70,
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
