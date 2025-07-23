import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import StyledButton from "../components/Button";
export default function HomeScreen() {
  const [value, setValue] = useState("");
  return (
    <View>
      <View style={styles.mainContent}>
        <Text style={styles.label}>Room Code</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder="Enter code"
        />
        <StyledButton title="Join" href="/gamePlay" />
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
  input: {
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 15,
    fontSize: 16,
  },
});
