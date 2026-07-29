import React from "react";
import { StyleSheet, Text, View } from "react-native";

const StatusLabel = ({ status }) => {
  return (
    <View style={styles.roundBorder}>
      <Text style={styles.statusText}>{status}</Text>
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
