import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import DefaultHeader from "../components/DefaultHeader";
import Notification from "../components/Notification";
const NotificationListScreen = () => {
  return (
    <SafeAreaView>
      <DefaultHeader />
      <Notification />
    </SafeAreaView>
  );
};

export default NotificationListScreen;

const styles = StyleSheet.create({});
