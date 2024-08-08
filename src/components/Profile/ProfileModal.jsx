import React from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import ModalOption from "../Shared/ModalOption";

const ProfileModal = ({ isVisible, toggleModal }) => (
  <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
    <View style={styles.modalContent}>
      <ModalOption title="Option 1" onPress={() => console.log("Option 1")} />
      <ModalOption title="Option 2" onPress={() => console.log("Option 2")} />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileModal;
