import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import StyledButton from "../components/Button";
import { loadData, saveData } from "../hooks/useStorage";
import { PostPlayer } from "../modules/PostPlayer";
import { PostUser } from "../modules/PostUser";

export default function CreateUser() {
  const params = useLocalSearchParams();
  console.log("PARAMS", params);
  const type = params.type;
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Validate username: no spaces, non-empty
  const validateUsername = (text) => {
    if (!text) {
      setUsernameError("Username is required");
    } else if (/\s/.test(text)) {
      setUsernameError("Username cannot contain spaces");
    } else {
      setUsernameError("");
    }
    setUsername(text);
  };

  // Simple email regex validation
  const validateEmail = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(text)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      const response = await PostUser({ username, email });
      console.log("User created:", response);
      await saveData("userId", response.userId);

      if (type === "player") {
        const gameId = await loadData("gameId");
        if (!gameId) {
          console.error("No game code found in storage");
          return;
        }
        console.log("gaem", gameId);
        const resp = await PostPlayer({
          gameId: gameId,
          userId: response.userId,
        });
        router.push({
          pathname: "/waitingRoom",
          params: { userId: response.userId },
        });
      } else if (type === "host") {
        router.push({
          pathname: "/createGame",
          params: { userId: response.userId },
        });
      }
    } catch (error) {
      console.error("Failed to create user:", error.message);
    }
  };

  const isFormValid = !usernameError && !emailError && username && email;

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.title}>Create User</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username (no spaces):</Text>
        <TextInput
          style={[styles.input, usernameError ? styles.inputError : null]}
          value={username}
          onChangeText={validateUsername}
          placeholder="Enter username"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {usernameError ? (
          <Text style={styles.errorText}>{usernameError}</Text>
        ) : null}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          value={email}
          onChangeText={validateEmail}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>

      <StyledButton
        title="Create User"
        onPress={handleSubmit}
        disabled={!isFormValid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    textAlign: "center",
    marginVertical: 10,
    color: "white",
    fontWeight: "bold",
  },
  inputGroup: {
    marginVertical: 10,
  },
  label: {
    color: "white",
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
});
