import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import colors from "../../global/colors";

const ImagePreview = ({ image }) => (
  <View style={styles.container}>
    {image ? (
      <Image style={styles.image} source={{ uri: image }} />
    ) : (
      <Text style={styles.text}>No image selected</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    aspectRatio: 9 / 16,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: colors.backgroundBlack,
    borderWidth: 1,
    margin: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  text: {
    color: colors.placeholderGray,
    fontSize: 16,
  },
});

export default ImagePreview;
