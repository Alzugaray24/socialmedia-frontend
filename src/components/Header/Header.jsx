import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../global/colors";

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryBlue,
  },
  text: {
    fontSize: 22,
    fontFamily: "Josefin",
    color: colors.white,
  },
});