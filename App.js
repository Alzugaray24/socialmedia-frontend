import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Navigator from "./src/navigation/Navigator";
import colors from "./src/global/colors";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlue,
  },
});
