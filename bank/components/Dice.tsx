import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

const diceFaces = {
  1: [[1, 1]],
  2: [
    [0, 0],
    [2, 2],
  ],
  3: [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  4: [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
  ],
  5: [
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2],
  ],
  6: [
    [0, 0],
    [1, 0],
    [2, 0],
    [0, 2],
    [1, 2],
    [2, 2],
  ],
};

const DiceRoller = ({ trigger, onPotChange }) => {
  const [dice, setDice] = useState([1, 1]);
  const [rolls, setRolls] = useState(0);
  const [pot, setPot] = useState(0);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    rollDice();
  }, [trigger]);

  useEffect(() => {
    onPotChange(pot);
  }, [pot]);

  const rollDice = () => {
    const newDice = [
      Math.ceil(Math.random() * 6),
      Math.ceil(Math.random() * 6),
    ];

    setDice(newDice);

    const sum = newDice[0] + newDice[1];
    const isDouble = newDice[0] === newDice[1];

    // First update rolls and get the new rolls count
    setRolls((prevRolls) => {
      const newRolls = prevRolls + 1;

      // Then update pot based on newRolls and dice outcome
      setPot((prevPot) => {
        console.log(
          "🎲 Rolled Dice:",
          newDice,
          "Sum:",
          newDice[0] + newDice[1]
        );
        if (sum === 7) {
          if (newRolls <= 3) {
            return prevPot + 70;
          } else {
            return 0;
          }
        } else if (isDouble) {
          if (newRolls <= 3) {
            return prevPot + sum;
          } else {
            return prevPot * 2;
          }
        } else {
          return prevPot + sum;
        }
      });

      // Reset rolls to 0 if sum is 7 and newRolls > 3
      if (sum === 7 && newRolls > 3) {
        setRolls(0);
      }

      return newRolls; // update rolls state
    });

    // Shake animation
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 6,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -6,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderDie = (value, index) => {
    return (
      <Animated.View
        key={index}
        style={[styles.die, { transform: [{ translateX: shakeAnim }] }]}
      >
        <View style={styles.dieFace}>
          {[0, 1, 2].map((row) => (
            <View key={row} style={styles.dieRow}>
              {[0, 1, 2].map((col) => {
                const isDot = diceFaces[value].some(
                  ([r, c]) => r === row && c === col
                );
                return (
                  <View
                    key={col}
                    style={[styles.dot, isDot && styles.dotVisible]}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.diceContainer}>
        {dice.map((val, i) => renderDie(val, i))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
  diceContainer: {
    flexDirection: "row",
    gap: 20,
  },
  die: {
    width: 80,
    height: 80,
    backgroundColor: "#FFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    margin: 20,
  },
  dieFace: {
    flexDirection: "column",
  },
  dieRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 14,
    height: 14,
    margin: 4,
    borderRadius: 7,
    backgroundColor: "transparent",
  },
  dotVisible: {
    backgroundColor: "#000",
  },
  button: {
    backgroundColor: "#FF6F61",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default DiceRoller;
