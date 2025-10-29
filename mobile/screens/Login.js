import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";

const Login = () => {
  return (
    <KeyboardAvoidingView
      style={styles.loginContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        source={require("../assets/INHA.png")}
        style={styles.INHAImg}
      ></Image>
      <View style={styles.loginInputView}>
        <Text>학번</Text>
        <TextInput placeholder="학번 8자리" style={styles.textInput} />
        <Text>비밀번호</Text>
        <TextInput
          placeholder="비밀번호를 입력해주세요."
          secureTextEntry
          style={styles.textInput}
        />
        <Pressable style={styles.loginBtn}>
          <Text style={styles.loginText}>Log In</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  INHAImg: {
    width: 107,
    height: 107,
    marginBottom: 50,
  },
  loginInputView: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 22,
  },
  textInput: {
    width: 272,
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 15,
  },
  loginBtn: {
    backgroundColor: "#215294",
    width: 272,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  loginText: {
    color: "white",
    fontSize: 16,
  },
});
