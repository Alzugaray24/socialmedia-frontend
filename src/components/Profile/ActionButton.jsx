import React from "react";
import { StyleSheet, Pressable, Text, ActivityIndicator } from "react-native";
import colors from "../../global/colors";

const ActionButton = ({ onPress, loading, title }) => (
  <Pressable style={styles.button} onPress={onPress}>
    {loading ? (
      <ActivityIndicator size="small" color={colors.white} />
    ) : (
      <Text style={styles.text}>{title}</Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: "80%",
    backgroundColor: colors.primaryBlue,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginBottom: 20,
  },
  text: {
    color: colors.white,
    fontSize: 16,
  },
});

export default ActionButton;
