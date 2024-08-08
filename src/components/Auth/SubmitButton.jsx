import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../../global/colors";

const SubmitButton = ({ onPress, isLoading, text }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={isLoading}
    >
      <Text style={styles.buttonText}>
        {isLoading ? "Registrando..." : text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primaryBlue,
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: "50%",
    borderRadius: 25,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SubmitButton;
