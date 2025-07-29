import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import StyledButton from "../components/Button";
import Dropdown from "../components/DropDown";
import Counter from "../components/RoundCounter";
import { loadData, saveData } from "../hooks/useStorage";
import { PostGame } from "../modules/PostGame";
export default function CreateGame() {
  const [hostId, setHostId] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [rounds, setRounds] = useState("10");
  const [gameName, setGameName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchHostId = async () => {
      const id = await loadData("userId");
      setHostId(id);
    };
    fetchHostId();
  }, []);

  const handleSubmit = async () => {
    console.log(groupSize, rounds, gameName);
    if (!isFormValid) return;

    try {
      const response = await PostGame({ hostId, groupSize, rounds, gameName });
      console.log("Game created:", response);
      await saveData("gameId", response.code);
      router.push({
        pathname: "/waitingRoomHost",
      });
    } catch (error) {
      console.error("Failed to create user:", error.message);
    }
  };

  const isFormValid = gameName && rounds && groupSize;
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
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
            value={gameName}
            onChangeText={setGameName}
            placeholder="Event name"
          />
          <View style={{ zIndex: 3000 }}>
            <Dropdown groupSize={groupSize} setGroupSize={setGroupSize} />
          </View>
          <View style={{ zIndex: 1000 }}>
            <Text style={styles.label}>Rounds:</Text>
            <View style={styles.container}>
              <Counter rounds={rounds} setRounds={setRounds} />
            </View>
          </View>
          <StyledButton
            title="Create Game"
            onPress={handleSubmit}
            disabled={!isFormValid}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  mainContent: {
    marginHorizontal: "auto",
    width: "70%",
  },
  label: {
    marginTop: 20,
    marginBottom: 4,
    fontSize: 16,
    color: "#FFF5E1",
  },
  gameWrapper: {
    marginHorizontal: "auto",
    width: "70%",
    marginVertical: 10,
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
