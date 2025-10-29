import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./screens/MainScreen";
import AddPostScreen from './screens/AddPostScreen';
import PostListScreen from "./screens/PostListScreen";
import NotificationListScreen from "./screens/NotificationListScreen";
import UserScreen from './screens/UserScreen';
import SettingScreen from './screens/SettingScreen';
import Login from './screens/Login';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* 메인 화면 */}
        <Stack.Screen 
          name="LoginScreen" 
          component={Login} 
        />
        {/* 메인 화면 */}
        <Stack.Screen 
          name="MainScreen" 
          component={MainScreen} 
        />
        {/* 알림 목록 화면 */}
        <Stack.Screen 
          name="NotificationList" 
          component={NotificationListScreen}
        />
        {/* 게시글 리스트 화면 */}
        <Stack.Screen 
          name="PostListScreen" 
          component={PostListScreen}
        />
        {/* 게시글 등록 화면 */}
        <Stack.Screen 
          name="AddPostScreen" 
          component={AddPostScreen}
        />
        {/* 설정 화면 */}
        <Stack.Screen 
          name="SettingScreen" 
          component={SettingScreen}
        />
        {/* 유저 화면 */}
        <Stack.Screen 
          name="UserScreen" 
          component={UserScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>

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
