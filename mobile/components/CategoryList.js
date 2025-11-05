import { Checkbox } from "expo-checkbox";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const CategoryList = ({ selected, setSelected }) => {
  const categories = useSelector((state) => state.category.categories);

  return (
    <View style={styles.listContainer}>
      <View style={styles.section}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setSelected(item)}
            style={styles.checkboxContainer}
          >
            <Checkbox
              value={item.id === selected?.id ? true : false}
              onValueChange={() => setSelected(item)}
            />
            <Text style={styles.label}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  listContainer: {
    height: 300,
    paddingVertical: 20,
  },
  section: {
    paddingHorizontal: 10,
    flexDirection: "column",
    flexWrap: "wrap",
  },
  checkboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 20,
    marginBottom: 6,
    alignItems: "center",
  },
  tagWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingTop: 20,
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
  label: {
    marginLeft: 5,
  },
});
