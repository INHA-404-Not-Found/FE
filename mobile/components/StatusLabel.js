import { StyleSheet, Text, View } from "react-native";
import React from "react";

const StatusLabel = () => {
  return (
    <View style={styles.roundBorder}>
      <Text style={styles.statusText}>미완료</Text>
    </View>
  );
};

export default StatusLabel;

const styles = StyleSheet.create({
  roundBorder: {
    borderWidth: 1,
    borderColor: "#EA580C",
    borderRadius: 15,
  },
  statusText: {
    color: "#EA580C",
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 12,
  },
});
