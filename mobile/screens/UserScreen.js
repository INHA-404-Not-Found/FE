import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import DefaultHeader from "../components/DefaultHeader";
import { useAuth } from "../hooks/useAuth";
const UserScreen = () => {
  const myInfo = useSelector((state) => state.my.info);
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.safe} edge={["top"]}>
      <DefaultHeader />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1, // 컨텐츠가 화면보다 작아도 flex 적용
          justifyContent: "center", // 수직 중앙
          alignItems: "center", // 수평 중앙
          paddingHorizontal: 20, // 좌우 여백
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
              {myInfo ? (
                <Text style={styles.ProfileDetailContent}>
                  {myInfo.department}
                </Text>
              ) : (
                <text>로그인 해주세요.</text>
              )}
            </View>

            <View style={styles.ProfileDetail}>
              <View style={styles.ProfileDetailTitleRow}>
                <Text style={styles.ProfileDetailTitle}>학번</Text>
                <Text style={styles.ProfileDetailSubTitle}>Student ID</Text>
              </View>
              <Text style={styles.ProfileDetailContent}>
                {myInfo.studentId}
              </Text>
            </View>

            <View style={styles.ProfileDetail}>
              <View style={styles.ProfileDetailTitleRow}>
                <Text style={styles.ProfileDetailTitle}>성명</Text>
                <Text style={styles.ProfileDetailSubTitle}>Name</Text>
              </View>
              <Text style={styles.ProfileDetailContent}>{myInfo.name}</Text>
            </View>

            <View style={styles.ProfileDetail}>
              <View style={styles.ProfileDetailTitleRow}>
                <Text style={styles.ProfileDetailTitle}>이메일</Text>
                <Text style={styles.ProfileDetailSubTitle}>E-mail</Text>
              </View>
              <Text style={styles.ProfileDetailContent}>{myInfo.email}</Text>
            </View>
            <View>
              <Pressable onPress={() => logout()} style={styles.logoutBtn}>
                <Text style={styles.logoutText}>Log out</Text>
              </Pressable>
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
    marginTop: 40,
  },
  ProfileDetailContainer: {
    flexDirection: "column",
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
    textDecoration: "underline",
  },
  ProfileDetailContent: {
    marginTop: 4,
    fontSize: 16,
    color: "#333",
  },
  ProfileImg: {
    width: 120,
    height: 150,
    backgroundColor: "#F5F9FF",
    borderWidth: 1.5,
    borderColor: "#215294",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: {
    color: "#215294",
    textDecorationLine: "underline",
    textDecorationColor: "#215294",
    fontSize: 16,
  },
  InhaImg: {
    marginTop: 30,
    width: 200,
    resizeMode: "contain",
    alignSelf: "center",
    opacity: 0.2,
  },
  logoutBtn: {
    backgroundColor: "#215294",
    width: 100,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
  },
});
