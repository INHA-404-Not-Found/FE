import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./screens/MainScreen";
import PostListScreen from "./screens/PostListScreen";

export default function App() {
  return <PostListScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
