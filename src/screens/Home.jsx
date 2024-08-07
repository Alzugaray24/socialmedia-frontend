import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../global/colors";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    color: colors.backgroundBlack,
  },
});
