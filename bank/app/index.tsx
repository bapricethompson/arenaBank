import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import StyledButton from "../components/Button";

export default function HomeScreen() {
  const [value, setValue] = useState("");
  const router = useRouter();
  return (
    <View>
      <View style={styles.mainContent}>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/arenaLogo.png")}
            style={styles.image}
          />
        </View>

        <Text style={styles.label}>Room Code</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder="Enter code"
        />
        <StyledButton title="Join" href="/waitingRoom" />
        <View style={styles.container}>
          <Pressable onPress={() => router.push("/createGame")}>
            <Text style={styles.linkText}>Create Game</Text>
          </Pressable>
        </View>
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
    color: "white",
  },
  input: {
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 15,
    fontSize: 16,
  },
  linkText: {
    textDecorationLine: "underline",
    color: "white",
    fontSize: 18,
  },
  container: {
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Optional, for vertical centering
    marginTop: 20,
  },
  image: { width: 200, height: 200, resizeMode: "contain", marginVertical: 15 },
});
