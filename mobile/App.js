import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./screens/MainScreen";
import PostListScreen from "./screens/PostListScreen";
import NotificationListScreen from "./screens/NotificationListScreen";

export default function App() {
  return <NotificationListScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
