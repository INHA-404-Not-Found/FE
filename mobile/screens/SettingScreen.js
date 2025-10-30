import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import StatusLabel from "../components/StatusLabel";
import DefaultHeader from "../components/DefaultHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.safe} edge={['top']}>
      <DefaultHeader />
      <ScrollView contentContainerStyle={styles.PostContainer}>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  PostContainer: {
    alignSelf: "stretch",
  },
  UploadedImg: {
    width: "100%",

    borderRadius: 0,
    backgroundColor: "#F1F5F9",
  },
  ContentContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 13,
    color: "#5B5B5B",
    marginBottom: 3,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "600",
  },
  infoList: {
    marginVertical: 10,
  },
  infoItem: {
    fontSize: 14,
    color: "#374151",
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#1F2937",
    marginTop: 4,
    fontWeight: "500",
  },
});
