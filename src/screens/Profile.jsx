import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../global/colors";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Profile</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBlack,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    color: colors.white,
  },
});
