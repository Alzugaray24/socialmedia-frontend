import React from "react";
import { TextInput, Text, StyleSheet, View } from "react-native";
import colors from "../../global/colors";

const TextInputField = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  secureTextEntry,
  keyboardType,
}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholderGray}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 25,
    fontSize: 16,
    color: colors.backgroundBlack,
  },
  errorText: {
    color: "red",
    marginBottom: 12,
  },
});

export default TextInputField;
