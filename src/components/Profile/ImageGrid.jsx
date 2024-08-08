import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const ImageGrid = ({ images, onImagePress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onImagePress(item)}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.grid}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    padding: 10,
    width: "100%",
  },
  image: {
    height: 170,
    width: 170,
    margin: 5,
    borderRadius: 10,
  },
});

export default ImageGrid;
