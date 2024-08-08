import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../../global/colors";

const Button = ({ onPress, title, style, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primaryBlue,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontSize: 16,
  },
});

export default Button;
