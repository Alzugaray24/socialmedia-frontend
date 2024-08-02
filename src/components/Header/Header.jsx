import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../global/colors";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useDispatch } from "react-redux";
import { clearUser } from "../../features/Auth/AuthSlice";

const Header = ({ title }) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(clearUser());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => handleLogOut()}>
        <SimpleLineIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.primaryBlue,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 22,
    fontFamily: "Josefin",
    color: colors.white,
    position: "absolute",
    left: 50,
    right: 50,
    textAlign: "center",
  },
});
