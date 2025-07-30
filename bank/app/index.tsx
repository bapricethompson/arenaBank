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
import Toast from "react-native-toast-message";
import StyledButton from "../components/Button";
import { saveData } from "../hooks/useStorage";
import { FindGame } from "../modules/FindGame";

export default function HomeScreen() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleJoin = async () => {
    if (!value.trim()) {
      Toast.show({
        type: "error",
        text1: "Room code required",
        text2: "Please enter a room code to join.",
        position: "bottom",
        visibilityTime: 3000,
      });
      return;
    }
    try {
      await saveData("roomCode", value.trim());
      await saveData("userRole", "player");
      console.log("here");
      const resp = await FindGame({
        gameCode: value.trim(),
      });
      await saveData("gameId", resp.id);
      router.push(`/createUser?type=player`);
    } catch (e) {
      console.error("Failed to save room code:", e);
      Toast.show({
        type: "error",
        text1: "Save failed",
        text2: "Failed to save room code. Please try again.",
        position: "bottom",
        visibilityTime: 3000,
      });
    }
  };

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
          autoCapitalize="characters"
        />

        <StyledButton title="Join" onPress={handleJoin} />
        <View style={styles.container}>
          <Pressable onPress={() => router.push(`/createUser?type=host`)}>
            <Text style={styles.linkText}>Create Game</Text>
          </Pressable>
        </View>
      </View>
      <Toast />
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
