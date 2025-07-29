import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function WaitingRoom() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          color: "white",
          alignSelf: "center",
        }}
      >
        Ready to Start?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  guidelinesContainer: {
    marginBottom: 32,
    backgroundColor: "#FFBF00",
    width: "90%",
    padding: 30,
    marginHorizontal: "auto",
    marginVertical: 10,
    borderRadius: 5,
  },
  rules: {
    width: "90%",
    marginHorizontal: "auto",
    marginTop: 15,
  },
  guideline: {
    fontSize: 16,
    marginBottom: 12,
    color: "black",
    fontWeight: "bold",
  },
});
