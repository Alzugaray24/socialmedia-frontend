import React from "react";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";
import colors from "../../global/colors";

const ProfileImage = ({ source, loading }) => (
  <View style={styles.container}>
    {loading ? (
      <ActivityIndicator size="large" color={colors.primaryBlue} />
    ) : (
      <Image style={styles.image} source={source} />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "green",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ProfileImage;
