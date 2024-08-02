// src/App.js
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import Navigator from "./src/navigation/Navigator";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/store/configureStore";
import colors from "./src/global/colors";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <Navigator />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlue,
  },
});
