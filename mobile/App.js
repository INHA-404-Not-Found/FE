import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch } from "react-redux";
import { store } from "./Redux/store";

import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import api from "./api/api";
import { setCategory } from "./Redux/slices/categorySlice";
import { setLocation } from "./Redux/slices/locationSlice";
import AddLostPostScreen from "./screens/AddLostPostScreen";
import AddPostScreen from "./screens/AddPostScreen";
import EditPostScreen from "./screens/EditPostScreen";
import Login from "./screens/Login";
import MainScreen from "./screens/MainScreen";
import MyPostListScreen from "./screens/MyPostListScreen";
import NotificationListScreen from "./screens/NotificationListScreen";
import PostListScreen from "./screens/PostListScreen";
import PostScreen from "./screens/PostScreen";
import UserScreen from "./screens/UserScreen";

/*
// 앱이 꺼져있을때 알림이 도착하면(Background 알림) 어떻게 처리할 지 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true, // 소리 재생 여부
    shouldShowAlert: true, // 알림 도착 시 사용자에게 표시할지 여부
    shouldSetBadge: true, // 뱃지 아이콘 표시 여부 (iOS)
  }),
});

// 푸시 알림 권한 요청, 토큰 받기
async function registerForPushNotificationAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX, // 알림 중요도 설정
      vibrationPattern: [0, 250, 250, 250], // 진동 패턴
      lightColor: "#FF231F7C", // 알림 LED 색상
    });
  }

  if (Device.isDevice) {
    // 현재 알림 권한 상태 확인
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // 권한이 없다면 알림 권한 요청
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // 사용자가 알림 권한 거부 선택시 함수 종료
    if (finalStatus !== "granted") {
      handleRegistrationError("푸쉬 알림 권한이 거부되었습니다.");
      return;
    }

    // Expo 푸시 토큰 받기
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "com.anonymous.next_campus",
        })
      ).data;
      console.log("Expo 푸시 토큰 발급 완료: ", pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(e);
    }
  } else {
    handleRegistrationError("푸시 알림을 받기 위해서 실제 기기가 필요합니다.");
  }
}

// Expo 푸시 토큰 서버에 전송하기
const sendTokenToServer = async (token) => {
  try {
    const res = await api.post("/fcm/token", {
      token,
    });
    console.log("Expo 푸시 토큰 저장 성공: ", res.data);
  } catch (error) {
    console.error(
      "Expo 푸시 토큰 저장 실패:",
      error?.response?.status,
      error?.message
    );
  }
};
*/
const Stack = createNativeStackNavigator();

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");

        dispatch(setCategory(res.data)); // ✅ Redux에 저장
        console.log("카테고리 불러오기 성공:", res.data);
      } catch (err) {
        console.error("카테고리 불러오기 실패:", err);
      }
    };

    const fetchLocations = async () => {
      try {
        const res = await api.get("/locations");

        dispatch(setLocation(res.data)); // ✅ Redux에 저장
        console.log("장소 목록 불러오기 성공:", res.data);
      } catch (err) {
        console.error("장소 목록 불러오기 실패:", err);
      }
    };

    fetchCategories(); // 앱 실행 시 1회 호출
    fetchLocations();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* 로그인 화면 */}
        <Stack.Screen name="LoginScreen" component={Login} />
        {/* 메인 화면 */}
        <Stack.Screen name="MainScreen" component={MainScreen} />
        {/* 게시글 리스트 화면 */}
        <Stack.Screen name="PostListScreen" component={PostListScreen} />
        {/* 습득 게시글 등록 화면 */}
        <Stack.Screen name="AddPostScreen" component={AddPostScreen} />
        {/* 분실 게시글 등록 화면 */}
        <Stack.Screen name="AddLostPostScreen" component={AddLostPostScreen} />
        {/* 유저 화면 */}
        <Stack.Screen name="UserScreen" component={UserScreen} />
        {/* 내 게시물 리스트 화면*/}
        <Stack.Screen name="MyPostListScreen" component={MyPostListScreen} />
        {/* 게시글 수정 화면*/}
        <Stack.Screen name="EditPostScreen" component={EditPostScreen} />
        {/* 내 게시물 */}
        <Stack.Screen name="PostScreen" component={PostScreen} />
        {/* 알림 목록 화면 */}
        <Stack.Screen
          name="NotificationListScreen"
          component={NotificationListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  /*
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  useEffect(() => {
    // 1. 알림 권한 요청 -> 허용시 토큰 발급, 서버에 저장
    registerForPushNotificationAsync()
      .then((token) => sendTokenToServer(token))
      .catch((error) => console.log(error));

    // 2. 알림 수신 리스너 등록 (앱 실행 중 알림 도착시)
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("알림 수신 (foreground): ", notification);
        setNotification(notification);
      });

    // 3. 알림 반응 리스너 등록 (사용자가 알림을 탭 할 경우)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("알림 반응: ", response);
        // response.notification.request.content.data
        // 알림에 포함된 데이터에 접근하고 특정 화면으로 이동하는 등의 로직 처리 추가하기
      });

    // 컴포넌트 unmount 시 구독 객체에서 remove() 호출
    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);
  */
  useEffect(() => {
    const boot = async () => {
      const access = await tokenStorage.getAccessTStorage();
      if (access) {
        TokenStore.setToken(access);
        console.log("기존 토큰 복원 완료:", access);
      }
    };
    boot();
  }, []);

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
