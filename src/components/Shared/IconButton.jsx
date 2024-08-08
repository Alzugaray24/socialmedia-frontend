import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  FontAwesome5,
  AntDesign,
  SimpleLineIcons,
  Feather,
} from "@expo/vector-icons";

const IconButton = ({ iconName, label, onPress }) => {
  const IconComponent =
    iconName === "user-friends"
      ? FontAwesome5
      : iconName === "message1"
      ? AntDesign
      : iconName === "user-following"
      ? SimpleLineIcons
      : Feather;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <IconComponent name={iconName} size={24} color="black" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginTop: 4,
    fontSize: 16,
  },
});

export default IconButton;
