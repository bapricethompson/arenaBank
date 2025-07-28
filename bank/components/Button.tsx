import { useRouter } from "expo-router";
import React from "react";
import { Button } from "react-native-paper";

export default function StyledButton({
  href,
  title = "Join",
  disabled = false,
}) {
  const router = useRouter();

  const buttonColor = disabled ? "#ccc" : "#FF6F61";

  return (
    <Button
      mode="contained"
      onPress={() => router.push(href)}
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
