import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import colors from "../global/colors";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>HOME</Text>
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
  photo: {
    height: 200,
    width: 200,
    margin: 5,
    borderRadius: 10,
  },
});
