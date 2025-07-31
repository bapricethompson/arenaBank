import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { loadData } from "../hooks/useStorage";
import { initSocket } from "../utils/socket";

export default function WaitingRoom() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    async function setupConnection() {
      const playerName = await loadData("userName");
      const savedRoomCode = await loadData("roomCode");

      if (!savedRoomCode || !playerName) {
        console.error("Missing roomCode or playerName");
        return;
      }

      setRoomCode(savedRoomCode);
      console.log("Joining room:", savedRoomCode);

      const socket = initSocket();

      socket.onopen = () => {
        console.log("WebSocket connected (Player Waiting Room)");
        socket.send(
          JSON.stringify({
            type: "join",
            room: savedRoomCode,
            name: playerName,
          })
        );
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Message received:", data);

        if (data.type === "error") {
          console.error("Error:", data.message);
          // Optionally redirect to home or show error to user
          if (data.message === "Room not found.") {
            router.push("/"); // Redirect to home or error screen
          }
        }

        if (data.type === "round_update") {
          console.log("Game started! Navigating to gameplay.");
          router.push("/gamePlay");
        }
      };

      socket.onerror = (err) => {
        console.error("WebSocket error:", err.message);
      };

      socket.onclose = () => {
        console.warn("WebSocket closed.");
      };
    }

    setupConnection();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          color: "white",
          alignSelf: "center",
        }}
      >
        Getting Things Ready...
      </Text>
      <View style={styles.guidelinesContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}> How to play:</Text>
        <View style={styles.rules}>
          <Text style={styles.guideline}>1. Dice roll automatically</Text>
          <Text style={styles.guideline}>2. Doubles double your points.</Text>
          <Text style={styles.guideline}>
            3. Roll a 7 → round ends, unbanked scores result in 0 points for the
            round
          </Text>
          <Text style={styles.guideline}>
            4. You can Bank anytime to save your round score, but earn no more
            points for that round
          </Text>
          <Text style={styles.guideline}>
            5. Use power ups, but be careful each comes with risk
          </Text>
          <Text style={styles.guideline}>
            6. After all rounds, highest total score wins!
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  guidelinesContainer: {
    marginBottom: 32,
    backgroundColor: "#FFBF00",
    width: "90%",
    padding: 30,
    marginHorizontal: "auto",
    marginVertical: 10,
    borderRadius: 5,
  },
  rules: {
    width: "90%",
    marginHorizontal: "auto",
    marginTop: 15,
  },
  guideline: {
    fontSize: 16,
    marginBottom: 12,
    color: "black",
    fontWeight: "bold",
  },
});
