import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { useAddProfileImgMutation } from "../services/userService/userService";
import { setImageProfile } from "../features/User/UserSlice";
import ImagePreview from "../components/Profile/ImagePreview";
import ActionButton from "../components/Profile/ActionButton";

const ImageSelector = ({ navigation }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [triggerSaveProfileImage] = useAddProfileImgMutation();
  const user = useSelector((state) => state.auth.user);
  const id = user.id;

  const verifyCamaraPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permission required",
        "Camera permission is required to use this feature"
      );
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
      <ImagePreview image={image} />
      <ActionButton
        onPress={pickImage}
        loading={false}
        title="Tomar otra foto"
      />
      <ActionButton
        onPress={confirmImage}
        loading={loading}
        title="Confirmar"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default ImageSelector;
