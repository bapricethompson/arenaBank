import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import StyledButton from "../components/Button";

export default function startGame() {
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
        Share Game
      </Text>
      <View style={styles.gameWrapper}>
        <Text style={styles.label}>Game Code:</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder="Game Code"
          editable={false}
        />
        <StyledButton title="Start Game" href="/gamePlay" />
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
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
