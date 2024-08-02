// src/App.js
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import Navigator from "./src/navigation/Navigator";
import store from "./src/store/configureStore";
import colors from "./src/global/colors";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Navigator />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlue, // Cambiado a un color más oscuro para una mejor integración con el esquema de colores
  },
});
