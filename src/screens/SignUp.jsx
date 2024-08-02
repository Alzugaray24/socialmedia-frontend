import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import colors from "../global/colors"; // Ajusta la ruta según tu estructura
import { useFormik } from "formik";
import signUpSchema from "../validations/Auth/SignUp";
import { useRegisterMutation } from "../services/authService/authService";

const SignUp = ({ navigation }) => {
  const [register, { isLoading, error }] = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      try {
        const response = await register(values).unwrap(); // Manejo de respuesta
        Alert.alert(response.message || "Registro exitoso");
        navigation.navigate("Login");
      } catch (err) {
        console.log("Error:", err);
        Alert.alert("Error", err.data.message || "Ha ocurrido un error");
      }
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor={colors.placeholderGray}
          value={formik.values.name}
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
        />
        {formik.touched.name && formik.errors.name && (
          <Text style={styles.errorText}>{formik.errors.name}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor={colors.placeholderGray}
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          keyboardType="email-address"
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.errorText}>{formik.errors.email}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Edad"
          placeholderTextColor={colors.placeholderGray}
          value={formik.values.age}
          onChangeText={formik.handleChange("age")}
          onBlur={formik.handleBlur("age")}
          keyboardType="numeric"
        />
        {formik.touched.age && formik.errors.age && (
          <Text style={styles.errorText}>{formik.errors.age}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={colors.placeholderGray}
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          secureTextEntry
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={formik.handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Registrando..." : "Registrarse"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>
          ¿Ya tienes una cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.backgroundBlack,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    color: colors.primaryBlue,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 25,
    fontSize: 16,
    color: colors.white,
    backgroundColor: colors.inputBackground,
  },
  button: {
    backgroundColor: colors.primaryBlue,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 16,
  },
  loginText: {
    color: colors.primaryBlue,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 12,
  },
});

export default SignUp;
