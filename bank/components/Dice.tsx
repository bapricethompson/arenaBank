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

const DiceRoller = ({ trigger, onPotChange, externalDice }) => {
  const [dice, setDice] = useState([1, 1]);
  const [pot, setPot] = useState(0);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Effect to update dice when trigger changes or externalDice changes
  useEffect(() => {
    if (externalDice && externalDice.length === 2) {
      setDice(externalDice);
      updatePot(externalDice);
      runShakeAnimation();
    } else {
      rollDice();
    }
  }, [trigger, externalDice]);

  // Pass pot to parent whenever it changes
  useEffect(() => {
    onPotChange(pot);
  }, [pot]);

  const updatePot = (diceVals) => {
    const sum = diceVals[0] + diceVals[1];
    const isDouble = diceVals[0] === diceVals[1];

    setPot((prevPot) => {
      // This logic you can adjust to fit your game rules
      if (sum === 7) {
        return 0;
      } else if (isDouble) {
        return prevPot * 2;
      } else {
        return prevPot + sum;
      }
    });
  };

  const rollDice = () => {
    const newDice = [
      Math.ceil(Math.random() * 6),
      Math.ceil(Math.random() * 6),
    ];
    setDice(newDice);
    updatePot(newDice);
    runShakeAnimation();
  };

  const runShakeAnimation = () => {
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
