import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAddImageMutation } from "../services/imageService/imageService";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setImage } from "../features/Images/ImageSlice";

const Camara = () => {
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const [addImage] = useAddImageMutation();
  const [imageUri, setImageUri] = useState(null);
  const dispatch = useDispatch();

  const verifyCameraPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      alert("Camera permission is required to use this feature");
      navigation.goBack();
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const isCameraOk = await verifyCameraPermission();
    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        base64: true,
        quality: 0.2,
      });

      if (!result.canceled) {
        setImageUri(`data:image/jpeg;base64,${result.assets[0].base64}`);
      } else {
        navigation.goBack();
      }
    }
  };

  const uploadImage = async () => {
    try {
      const response = await addImage({ image: imageUri, id: user.id });
      dispatch(setImage(response.data.image)); // Asumiendo que `response.data.image` es la URL de la imagen
      setImageUri(null);
      Alert.alert("Success", "Image uploaded successfully!");
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image.");
    }
  };

  const handleCancel = () => {
    setImageUri(null);
    pickImage();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (!imageUri) {
        pickImage();
      }
    });

    return unsubscribe;
  }, [navigation, imageUri]);

  return (
    <View style={styles.container}>
      {imageUri ? (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Button title="Upload Image" onPress={uploadImage} />
          <Button title="Cancel" onPress={handleCancel} />
        </>
      ) : (
        <View style={styles.loading}>
          <Text>Opening camera...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: 300,
    height: 500,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Camara;
