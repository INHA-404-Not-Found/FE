import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch } from "react-redux";
import { store } from "./Redux/store";

import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import api from "./api/api";
import { setCategory } from "./Redux/slices/categorySlice";
import AddPostScreen from "./screens/AddPostScreen";
import EditPostScreen from "./screens/EditPostScreen";
import Login from "./screens/Login";
import MainScreen from "./screens/MainScreen";
import MyPostListScreen from "./screens/MyPostListScreen";
import NotificationListScreen from "./screens/NotificationListScreen";
import PostListScreen from "./screens/PostListScreen";
import PostScreen from "./screens/PostScreen";
import SettingScreen from "./screens/SettingScreen";
import UserScreen from "./screens/UserScreen";

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

    fetchCategories(); // 앱 실행 시 1회 호출
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
        {/* 알림 목록 화면 */}
        <Stack.Screen
          name="NotificationList"
          component={NotificationListScreen}
        />
        {/* 게시글 리스트 화면 */}
        <Stack.Screen name="PostListScreen" component={PostListScreen} />
        {/* 게시글 등록 화면 */}
        <Stack.Screen name="AddPostScreen" component={AddPostScreen} />
        {/* 설정 화면 */}
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        {/* 유저 화면 */}
        <Stack.Screen name="UserScreen" component={UserScreen} />
        {/* 내 게시물 리스트 화면*/}
        <Stack.Screen name="MyPostListScreen" component={MyPostListScreen} />
        {/* 게시글 수정 화면*/}
        <Stack.Screen name="EditPostScreen" component={EditPostScreen} />
        {/* 내 게시물 */}
        <Stack.Screen name="PostScreen" component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
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
