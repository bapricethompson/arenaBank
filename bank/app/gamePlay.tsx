import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DiceRoller from "../components/Dice";
import GameButton from "../components/GameButton";
import { loadData } from "../hooks/useStorage";
import { getSocket, initSocket } from "../utils/socket";

export default function GamePlay() {
  const [round, setRound] = useState(1);
  const [maxRounds, setMaxRounds] = useState(10);
  const [countdown, setCountdown] = useState(5);
  const [rollTrigger, setRollTrigger] = useState(0);
  const [pot, setPot] = useState(0);
  const [leaderboard, setLeaderboard] = useState({});
  const [messages, setMessages] = useState([]);
  const [bankedPlayers, setBankedPlayers] = useState(new Set());
  const [roomCode, setRoomCode] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const [diceFromSocket, setDiceFromSocket] = useState([1, 1]);

  useEffect(() => {
    // Load roomCode and check if this client is the host
    async function loadStorage() {
      try {
        const savedRoomCode = await loadData("roomCode");
        const savedUser = await loadData("userName");
        const max = await loadData("roudns");
        setMaxRounds(max);
        setPlayerName(savedUser);
        setRoomCode(savedRoomCode);
      } catch (error) {
        console.error("Failed to load storage:", error.message);
      }
    }
    loadStorage();
  }, []);

  useEffect(() => {
    console.log("room", roomCode);
    console.log("playerName", playerName);

    if (!roomCode || !playerName) return;

    const socket = initSocket(); // persistent instance

    function handleOpen() {
      console.log("WebSocket connected (GamePlay)");
      socket.send(
        JSON.stringify({
          type: "join",
          room: roomCode,
          name: playerName,
        })
      );
    }

    function handleMessage(event) {
      const data = JSON.parse(event.data);
      console.log("Received WebSocket message:", data);

      switch (data.type) {
        case "leaderboard_update":
          setLeaderboard(data.leaderboard);
          break;
        case "roll":
          console.log("roll", data.d1, data.d2);
          if (data.d1 && data.d2) {
            setDiceFromSocket([data.d1, data.d2]);
          }
          setPot(data.pot);
          setMessages((prev) => [...prev, data.message || "Dice rolled"]);
          break;
        case "banked":
          setMessages((prev) => [...prev, `${data.name} banked!`]);
          setBankedPlayers((prev) => new Set(prev).add(data.name));
          break;
        case "error":
          setMessages((prev) => [...prev, `Error: ${data.message}`]);
          break;
        case "round_update":
          setRound(data.round);
          setMessages((prev) => [...prev, `🔄 Starting Round ${data.round}`]);
          break;
        case "game_over":
          setMessages((prev) => [...prev, "🏁 Game Over!"]);
          // Optionally show leaderboard / final scores
          break;
        default:
          break;
      }
    }

    function handleError(error) {
      console.error("WebSocket error:", error.message);
    }

    function handleClose() {
      console.log("WebSocket connection closed");
    }

    if (socket.readyState === WebSocket.OPEN) {
      handleOpen();
    } else {
      socket.addEventListener("open", handleOpen);
    }

    socket.addEventListener("message", handleMessage);
    socket.addEventListener("error", handleError);
    socket.addEventListener("close", handleClose);

    return () => {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
      socket.removeEventListener("error", handleError);
      socket.removeEventListener("close", handleClose);
    };
  }, [roomCode, playerName]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          setRollTrigger((r) => r + 1);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePowerUp = (name) => {
    console.log("Used power-up:", name);
  };

  const handleBank = () => {
    console.log("BANKED!");
    const socket = getSocket();
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "bank" }));
    } else {
      console.warn("Socket is not open");
    }
  };

  return (
    <View>
      <View>
        <View style={styles.gameInfo}>
          <Text style={styles.gameText}>Round:</Text>
          <Text style={styles.gameText}>
            {round}/{maxRounds}
          </Text>
        </View>
        <View style={styles.gameInfo}>
          <Text style={styles.gameText}>Banked Players:</Text>
          <Text style={styles.gameText}>2/10</Text>
        </View>
        <ScrollView style={styles.leaderBoard}>
          <View>
            {Object.entries(leaderboard).map(([player, score]) => (
              <View key={player} style={styles.player}>
                <Text>{player}</Text>
                <Text>{score}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <Text
        style={{
          fontSize: 32,
          textAlign: "center",
          marginTop: 5,
          color: "white",
          fontWeight: "bold",
        }}
      >
        Rolling in {countdown}...
      </Text>

      <DiceRoller
        trigger={rollTrigger}
        onPotChange={setPot}
        externalDice={diceFromSocket} // <-- Pass dice from websocket here
      />

      <Text
        style={{
          fontSize: 32,
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        POT:
      </Text>

      <Text
        style={{
          fontSize: 96,
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {pot}
      </Text>

      <View style={styles.powerHolder}>
        <GameButton
          title="🔥"
          onPress={() => handlePowerUp("Fire")}
          type="powerup"
        />
        <GameButton
          title="🛡️"
          onPress={() => handlePowerUp("Shield")}
          type="powerup"
        />
        <GameButton
          title="🎯"
          onPress={() => handlePowerUp("Target")}
          type="powerup"
        />
      </View>

      <View style={styles.container}>
        <GameButton
          title="BANK"
          onPress={handleBank}
          type="bank"
          disabledOnceUsed={false}
          roundKey={round}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gameInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 5,
  },
  powerHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
    marginHorizontal: "auto",
  },
  powerUp: {
    width: 80,
    height: 80,
    backgroundColor: "#FFBF00",
    borderRadius: 5,
  },
  gameText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  leaderBoard: {
    width: "90%",
    marginHorizontal: "auto",
    marginVertical: 15,
    height: 125,
  },
  player: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    backgroundColor: "#A9A9A9",
    padding: 12,
    marginBottom: 7,
    borderRadius: 5,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
});
