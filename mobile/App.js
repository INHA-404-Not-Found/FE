import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./screens/MainScreen";
import PostListScreen from "./screens/PostListScreen";
import NotificationListScreen from "./screens/NotificationListScreen";
import MyPostListScreen from "./screens/MyPostListScreen";

export default function App() {
  return <MyPostListScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
