import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { io } from "socket.io-client";
import StyledButton from "../components/Button";
import DiceRoller from "../components/Dice";

const socket = io("http://<your-ip>:3001");

export default function GamePlay() {
  const [countdown, setCountdown] = useState(5);
  const [rollTrigger, setRollTrigger] = useState(0);
  const [pot, setPot] = useState(0);

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
  return (
    <View>
      <View>
        <View style={styles.gameInfo}>
          <Text style={styles.gameText}>Round:</Text>
          <Text style={styles.gameText}>7/10</Text>
        </View>
        <View style={styles.gameInfo}>
          <Text style={styles.gameText}>Banked Players:</Text>
          <Text style={styles.gameText}>2/10</Text>
        </View>
        <ScrollView style={styles.leaderBoard}>
          <View>
            <View style={styles.player}>
              <Text>player1</Text>
              <Text>500</Text>
            </View>
            <View style={styles.player}>
              <Text>player1</Text>
              <Text>500</Text>
            </View>
            <View style={styles.player}>
              <Text>player1</Text>
              <Text>500</Text>
            </View>
            <View style={styles.player}>
              <Text>player1</Text>
              <Text>500</Text>
            </View>
            <View style={styles.player}>
              <Text>player1</Text>
              <Text>500</Text>
            </View>
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
      <DiceRoller trigger={rollTrigger} onPotChange={setPot} />
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
        <View style={styles.powerUp}></View>
        <View style={styles.powerUp}></View>
        <View style={styles.powerUp}></View>
      </View>
      <StyledButton title="BANK" href="/gamePlay" />
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
});
