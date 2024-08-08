import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../../global/colors";

const NavigationLink = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.loginLink} onPress={onPress}>
      <Text style={styles.loginText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginLink: {
    marginTop: 16,
  },
  loginText: {
    color: colors.primaryBlue,
    fontSize: 16,
  },
});

export default NavigationLink;
