import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import colors from "../global/colors";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { useAddProfileImgMutation } from "../services/userService/userService";
import { setImageProfile } from "../features/User/UserSlice";

const { width, height } = Dimensions.get("window");

const ImageSelector = ({ navigation }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [triggerSaveProfileImage, result] = useAddProfileImgMutation();
  const user = useSelector((state) => state.auth.user);
  const id = user.id;

  const verifyCamaraPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      alert("Camera permission is required to use this feature");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const isCamaraOk = await verifyCamaraPermission();
    if (isCamaraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        base64: true,
        quality: 0.2,
      });

      if (!result.canceled) {
        const imageUri = `data:image/jpeg;base64,${result.assets[0].base64}`;
        setImage(imageUri);
      }
    }
  };

  const confirmImage = async () => {
    setLoading(true);
    await triggerSaveProfileImage({ image, id });
    dispatch(setImageProfile(image));
    setLoading(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagePreviewContainer}>
        {image ? (
          <Image style={styles.imagePreview} source={{ uri: image }} />
        ) : (
          <Text style={styles.imagePreviewText}>No image selected</Text>
        )}
      </View>
      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Tomar otra foto</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={confirmImage}>
        {loading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <Text style={styles.buttonText}>Confirmar</Text>
        )}
      </Pressable>
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  imagePreviewContainer: {
    width: width * 0.8,
    height: height * 0.5,
    backgroundColor: colors.inputBackground,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: colors.backgroundBlack,
    borderWidth: 1,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imagePreviewText: {
    color: colors.placeholderGray,
    fontSize: width * 0.05,
  },
  button: {
    height: height * 0.07,
    width: width * 0.5,
    backgroundColor: colors.primaryBlue,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: width * 0.04,
  },
});
