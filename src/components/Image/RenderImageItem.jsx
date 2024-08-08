import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import colors from "../../global/colors";

const RenderImageItem = ({ item, onPress }) => {
  console.log("aca", item);
  return (
    <Pressable onPress={() => onPress(item)}>
      <Image style={styles.photo} source={{ uri: item.url }} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  photo: {
    height: 170, // Ajusta el tamaño según tus necesidades
    width: 170, // Ajusta el tamaño según tus necesidades
    marginHorizontal: 10,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: colors.backgroundBlack,
  },
});

export default RenderImageItem;
