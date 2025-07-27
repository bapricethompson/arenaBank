import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const GameButton = ({
  title,
  onPress,
  disabled = false,
  disabledOnceUsed = true,
  roundKey,
  type = "powerup",
  style,
}) => {
  const [isDisabled, setIsDisabled] = useState(disabled);

  useEffect(() => {
    if (!disabledOnceUsed && roundKey) {
      setIsDisabled(false);
    }
  }, [roundKey]);

  const handlePress = () => {
    if (isDisabled) return;
    onPress?.();
    setIsDisabled(true);
  };

  const getDisplayContent = () => {
    if (type === "bank") {
      return isDisabled ? "BANKED" : "BANK";
    }
    return title;
  };

  return (
    <Button
      mode="contained"
      onPress={handlePress}
      disabled={isDisabled}
      style={[
        type === "bank" ? styles.bankStyle : styles.powerupStyle,
        isDisabled && styles.disabled,
        style,
      ]}
      labelStyle={styles.text}
      contentStyle={{ height: 80, justifyContent: "center" }}
    >
      {getDisplayContent()}
    </Button>
  );
};

const styles = StyleSheet.create({
  powerupStyle: {
    backgroundColor: "#FFBF00",
    borderRadius: 5,
    width: 80,
  },
  bankStyle: {
    backgroundColor: "#FF6F61",
    borderRadius: 10,
    width: "70%",
  },
  disabled: {
    backgroundColor: "#ccc",
  },
  text: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default GameButton;
