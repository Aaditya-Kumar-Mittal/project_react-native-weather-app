import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const MyButton = ({ title, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
 button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default MyButton;