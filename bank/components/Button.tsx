import { useRouter } from "expo-router";
import React from "react";
import { Button } from "react-native-paper";

export default function StyledButton({
  href,
  title = "Join",
  disabled = false,
  onPress,
}) {
  const router = useRouter();
  const buttonColor = disabled ? "#ccc" : "#FF6F61";

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (href) {
      router.push(href);
    }
  };

  return (
    <Button
      mode="contained"
      onPress={handlePress}
      disabled={disabled}
      style={{
        marginVertical: 15,
        alignSelf: "center",
        width: "80%",
        backgroundColor: buttonColor,
      }}
      contentStyle={{ paddingVertical: 12 }}
      labelStyle={{ fontSize: 18, color: disabled ? "#888" : "#fff" }}
    >
      {title}
    </Button>
  );
}
