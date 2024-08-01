import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthStackNavigator from "./StackNavigator/AuthStackNavigator";
import { NavigationContainer } from "@react-navigation/native";

const Navigator = () => {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
