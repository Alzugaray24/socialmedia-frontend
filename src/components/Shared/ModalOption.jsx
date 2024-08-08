import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ModalOption = ({ title, onPress }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  option: {
    marginBottom: 15,
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "black",
  },
});

export default ModalOption;
