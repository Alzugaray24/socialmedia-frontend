import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthStackNavigator from "./StackNavigator/AuthStackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import TabNavigator from "./TabNavigator";

const Navigator = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <NavigationContainer>
      {user === null ? <AuthStackNavigator /> : <TabNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
