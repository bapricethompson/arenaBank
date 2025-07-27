import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function Dropdown() {
  const [groupSize, setGroupSize] = useState("1");
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Group Size:</Text>
      <DropDownPicker
        open={open}
        value={groupSize}
        items={[
          { label: "1-15", value: "1" },
          { label: "16-50", value: "2" },
          { label: "51-100", value: "3" },
          { label: "100+", value: "4" },
        ]}
        setOpen={setOpen}
        setValue={setGroupSize}
        containerStyle={styles.pickerContainer}
        style={styles.picker}
        dropDownStyle={styles.dropdown}
        labelStyle={styles.labelStyle}
        placeholder="Select Group Size"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 8,
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 4,
    marginTop: 20,
  },
  pickerContainer: {
    height: "fit",
    width: "100%",
  },
  picker: {
    backgroundColor: "white",
    borderRadius: 8,
    color: "#333",
  },
  dropdown: {
    backgroundColor: "#fafafa",
    borderRadius: 8,
  },
  labelStyle: {
    color: "#333",
    fontSize: 16,
  },
});
