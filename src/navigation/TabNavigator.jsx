import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Header from "../components/Header/Header";
import colors from "../global/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import Profile from "../screens/Profile";
import Home from "../screens/Home";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <Header title={getTitle(route.name)} />,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Profile") {
            iconName = "user-alt";
          } else if (route.name === "Home") {
            iconName = "home";
          }

          return (
            <View style={styles.tabIcon}>
              <FontAwesome5
                name={iconName}
                size={size}
                color={focused ? colors.white : colors.darkGray}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const getTitle = (routeName) => {
  if (routeName === "Tienda") {
    return "Tienda";
  } else {
    return routeName;
  }
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    backgroundColor: colors.primaryBlue,
  },
  tabIcon: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default TabNavigator;
