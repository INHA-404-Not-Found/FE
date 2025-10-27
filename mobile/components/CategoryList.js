import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Checkbox } from "expo-checkbox";
import React, { useState } from "react";

const categories = [
  { id: "elec", label: "전자기기" },
  { id: "book", label: "도서" },
  { id: "cloth", label: "의류" },
  { id: "bag", label: "가방" },
  { id: "acc", label: "악세서리" },
  { id: "etc", label: "기타" },
];
const CategoryList = () => {
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  return (
    <View>
      <View style={styles.section}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => toggle(item.id)}
            style={styles.checkboxContainer}
          >
            <Checkbox
              value={selected.includes(item.id)}
              onValueChange={() => toggle(item.id)}
            />
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.tagWrap}>
        {selected.length > 0 ? (
          selected.map((id) => {
            const label = categories.find((c) => c.id === id)?.label;
            return (
              <View key={id} style={styles.tag}>
                <Image
                  source={require("../assets/check.png")}
                  style={styles.checkImg}
                ></Image>
                <Text style={styles.tagText}>{label}</Text>
              </View>
            );
          })
        ) : (
          <Text style={styles.noneText}>없음</Text>
        )}
      </View>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 10,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  checkImg: {
    width: 15,
    height: 10,
    marginRight: 5,
  },
});
