import { StyleSheet, Text, SafeAreaView, Alert } from "react-native";
import MyButton from "./components/MyButton";

export default function App() {
  const handlePress = () => {
    Alert.alert("Button Clicked!", "You clicked the custom button.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Modularized Component Example</Text>
      <MyButton title="Click Me" onPress={handlePress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
});

