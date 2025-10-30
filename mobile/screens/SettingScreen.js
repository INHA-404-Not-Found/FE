import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import StatusLabel from "../components/StatusLabel";
import DefaultHeader from "../components/DefaultHeader";

const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <DefaultHeader />
      <ScrollView contentContainerStyle={styles.PostContainer}>
        <Image
          source={require("../assets/INHA.png")}
          style={styles.UploadedImg}
        ></Image>
        <View style={styles.ContentContainer}>
          <View style={styles.headerRow}>
            <View style={{ flexShrink: 1, paddingRight: 12 }}>
              <Text style={styles.categoryText}>지갑(카드, 현금)</Text>
              <Text style={styles.titleText}>검정색 카드지갑 습득</Text>
            </View>
            <StatusLabel />
          </View>
          <Text style={styles.categoryText}>2025.10.10</Text>
          <View style={styles.infoList}>
            <Text style={styles.infoItem}>
              {"\u2022"} 습득 장소: 하이테크 1층 해동 카페
            </Text>
            <Text style={styles.infoItem}>
              {"\u2022"} 보관 위치: 하텍 2층 사무실
            </Text>
          </View>
          <Text style={styles.bodyText}>
            검정색 카드 지갑 하텍 1층 해동 카페에서 주웠습니다. 2층 사무실에
            맡겨놨으니까 알아서 찾아가세요.
          </Text>
        </View>
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
