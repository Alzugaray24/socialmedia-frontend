import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return <Tab.Navigator></Tab.Navigator>;
};

export default TabNavigator;

const styles = StyleSheet.create({});
