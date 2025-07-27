import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Counter = () => {
  const [count, setCount] = useState(10);

  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={decrement}>
        <Text style={styles.symbol}>−</Text>
      </Pressable>

      <Text style={styles.count}>{count}</Text>

      <Pressable style={styles.button} onPress={() => setCount(count + 1)}>
        <Text style={styles.symbol}>+</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ffc400", // Yellow
    width: 60,
    height: 60,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  symbol: {
    fontSize: 32,
    color: "#000",
    fontWeight: "bold",
  },
  count: {
    fontSize: 72,
    color: "#f9f4e5", // Light cream color
    fontWeight: "600",
    marginHorizontal: 10,
    textAlign: "center",
  },
});

export default Counter;
