import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import StyledButton from "../components/Button";
import { loadData } from "../hooks/useStorage";
import { PatchGame } from "../modules/PatchGame";
import { getSocket, initSocket } from "../utils/socket";

export default function WaitingRoomHost() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Load roomCode and check if this client is the host
    async function loadStorage() {
      try {
        const savedRoomCode = await loadData("roomCode");
        const savedGameId = await loadData("gameId");
        const savedRole = await loadData("userRole");
        setUserRole(savedRole);
        setRoomCode(savedRoomCode);
      } catch (error) {
        console.error("Failed to load storage:", error.message);
      }
    }
    loadStorage();
  }, []);

  useEffect(() => {
    if (!roomCode) return;

    const socket = initSocket(); // Reuses the same connection

    socket.onopen = async () => {
      console.log("WebSocket connected (WaitingRoom)");
      const playerName = await loadData("userName");
      socket.send(
        JSON.stringify({
          type: "join",
          room: roomCode,
          name: playerName,
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received WebSocket message:", data);
      if (data.type === "error") {
        console.error("Server error:", data.message);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error.message);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // No socket closing here!
  }, [roomCode]);

  const handleSubmit = async () => {
    try {
      const gameId = await loadData("gameId");
      const roomCode = await loadData("roomCode");

      console.log("gameId", gameId, "roomCode", roomCode);

      await PatchGame({
        gameId: gameId,
        inPlay: true,
        ended: false,
      });

      console.log("PatchGame Done");

      const socket = await getSocket();
      console.log("socket Done");
      if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("start_game");
        socket.send(
          JSON.stringify({
            type: "start_game",
            room: roomCode,
          })
        );
        console.log("Sent start_game message");
      } else {
        console.error("WebSocket is not open");
      }

      router.push("/gamePlay");
    } catch (error) {
      console.error("Failed to start game:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ready to Start?</Text>

      <View style={styles.codeContainer}>
        <Text style={styles.codeLabel}>Room Code:</Text>
        <Text style={styles.codeValue}>{roomCode}</Text>
      </View>

      <StyledButton title="Start Game" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
    marginBottom: 30,
    textAlign: "center",
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 40,
    minWidth: 200,
    justifyContent: "center",
  },
  codeLabel: {
    color: "white",
    fontSize: 18,
    marginRight: 8,
  },
  codeValue: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});
