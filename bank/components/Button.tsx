import { useRouter } from "expo-router";
import React from "react";
import { Button } from "react-native-paper";

export default function StyledButton({ href, title = "Settings" }) {
  const router = useRouter();

  return (
    <Button
      mode="contained"
      onPress={() => router.push(href)}
      style={{
        marginVertical: 15,
        alignSelf: "center",
        width: "80%",
        backgroundColor: "#FF6F61",
      }}
      contentStyle={{ paddingVertical: 12 }}
      labelStyle={{ fontSize: 18 }}
    >
      {title}
    </Button>
  );
}
