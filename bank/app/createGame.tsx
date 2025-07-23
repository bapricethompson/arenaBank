import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import DropdownMenu from "../components/DropDown";
export default function CreateGame() {
  const [value, setValue] = useState("");
  return (
    <View>
      <Text>Create Game</Text>
      <Text style={styles.label}>Event Name:</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="Event name"
      />
      <DropdownMenu></DropdownMenu>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContent: {
    marginHorizontal: "auto",
    width: "70%",
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    color: "#FFF5E1",
  },
  input: {
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 15,
    fontSize: 16,
  },
});
