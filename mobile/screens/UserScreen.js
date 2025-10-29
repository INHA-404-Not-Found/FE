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

const UserScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <DefaultHeader />
      <ScrollView 
        contentContainerStyle={{
          flexGrow: 1,          // 컨텐츠가 화면보다 작아도 flex 적용
          justifyContent: 'center', // 수직 중앙
          alignItems: 'center',     // 수평 중앙
          paddingHorizontal: 20,    // 좌우 여백
          marginBottom: 70,
        }}
      >
        <View style={styles.Profile}>
          {/* 프로필 사진 */}
          <View style={styles.ProfileImg}>
            <Text>프로필</Text>
          </View>

          {/* 프로필 내용 */}
          <View style={styles.ProfileDetailContainer}>
            <View style={styles.ProfileDetail}>
              <View style={styles.ProfileDetailTitleRow}>
                <Text style={styles.ProfileDetailTitle}>학부/학과</Text>
                <Text style={styles.ProfileDetailSubTitle}>Major/Dept.</Text>
              </View>
              <Text style={styles.ProfileDetailContent}>컴퓨터공학과</Text>
            </View>

            <View style={styles.ProfileDetail}>
              <View style={styles.ProfileDetailTitleRow}>
                <Text style={styles.ProfileDetailTitle}>학번</Text>
                <Text style={styles.ProfileDetailSubTitle}>Student ID</Text>
              </View>
              <Text style={styles.ProfileDetailContent}>12234069</Text>
            </View>

            <View style={styles.ProfileDetail}>
              <View style={styles.ProfileDetailTitleRow}>
                <Text style={styles.ProfileDetailTitle}>성명</Text>
                <Text style={styles.ProfileDetailSubTitle}>Name</Text>
              </View>
              <Text style={styles.ProfileDetailContent}>김도담</Text>
            </View>

            <View style={styles.ProfileDetail}>
              <View style={styles.ProfileDetailTitleRow}>
                <Text style={styles.ProfileDetailTitle}>이메일</Text>
                <Text style={styles.ProfileDetailSubTitle}>E-mail</Text>
              </View>
              <Text style={styles.ProfileDetailContent}>gemddkim22@gmail.com</Text>
            </View>
          </View>
        </View>
        <Image
          source={require("../assets/INHA.png")}
          style={styles.InhaImg}
        ></Image>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  Profile: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
  },
  ProfileDetailContainer: {
    flexDirection: 'column',
    gap: 20,
  },
  ProfileDetail: {
    marginVertical: 10,
  },
  ProfileDetailTitleRow: {
    flexDirection: "row",
    gap: 8,
  },
  ProfileDetailTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  ProfileDetailSubTitle: {
    fontSize: 10,
    color: "#666",
    textDecoration : 'underline',
  },
  ProfileDetailContent: {
    marginTop: 4,
    fontSize: 16,
    color: "#333",
  },
  ProfileImg: {
    marginTop: 5,
    backgroundColor: "#D9D9D9",
    width: 120,
    height: 150,
  },
  InhaImg: {
    marginTop: 50,
    height: undefined,
    alignSelf: 'center',
    opacity: 0.2,
  },
});
