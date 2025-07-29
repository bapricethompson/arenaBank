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
        Getting Things Ready...
      </Text>
      <View style={styles.guidelinesContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}> How to play:</Text>
        <View style={styles.rules}>
          <Text style={styles.guideline}>1. Dice roll automatically</Text>
          <Text style={styles.guideline}>2. Doubles double your points.</Text>
          <Text style={styles.guideline}>
            3. Roll a 7 → round ends, unbanked scores result in 0 points for the
            round
          </Text>
          <Text style={styles.guideline}>
            4. You can Bank anytime to save your round score, but earn no more
            points for that round
          </Text>
          <Text style={styles.guideline}>
            5. Use power ups, but be careful each comes with risk
          </Text>
          <Text style={styles.guideline}>
            6. After all rounds, highest total score wins!
          </Text>
        </View>
      </View>
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
