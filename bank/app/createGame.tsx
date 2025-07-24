import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import DropdownMenu from "../components/DropDown";
export default function CreateGame() {
  const [value, setValue] = useState("");
  return (
    <View>
      <Text
        style={{
          fontSize: 32,
          textAlign: "center",
          marginTop: 5,
          color: "white",
          fontWeight: "bold",
        }}
      >
        Create Game
      </Text>
      <View style={styles.gameWrapper}>
        <Text style={styles.label}>Event Name:</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder="Event name"
        />
        <DropdownMenu></DropdownMenu>
      </View>
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
  gameWrapper: {
    marginHorizontal: "auto",
    width: "70%",
    marginVertical: 12,
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
