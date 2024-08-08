import React from "react";
import { StyleSheet, View, Text, SafeAreaView, Alert } from "react-native";
import colors from "../global/colors";
import { useFormik } from "formik";
import signUpSchema from "../validations/Auth/SignUp";
import { useRegisterMutation } from "../services/authService/authService";
import TextInputField from "../components/Auth/TextInputField";
import SubmitButton from "../components/Auth/SubmitButton";
import NavigationLink from "../components/Auth/NavigationLink";

const SignUp = ({ navigation }) => {
  const [register, { isLoading }] = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      age: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      try {
        const response = await register(values).unwrap();
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
        <TextInputField
          placeholder="Nombre"
          value={formik.values.name}
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          error={formik.errors.name}
          touched={formik.touched.name}
        />
        <TextInputField
          placeholder="Apellido"
          value={formik.values.lastName}
          onChangeText={formik.handleChange("lastName")}
          onBlur={formik.handleBlur("lastName")}
          error={formik.errors.lastName}
          touched={formik.touched.lastName}
        />
        <TextInputField
          placeholder="Correo electrónico"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          error={formik.errors.email}
          touched={formik.touched.email}
          keyboardType="email-address"
        />
        <TextInputField
          placeholder="Edad"
          value={formik.values.age}
          onChangeText={formik.handleChange("age")}
          onBlur={formik.handleBlur("age")}
          error={formik.errors.age}
          touched={formik.touched.age}
          keyboardType="numeric"
        />
        <TextInputField
          placeholder="Contraseña"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          error={formik.errors.password}
          touched={formik.touched.password}
          secureTextEntry
        />
      </View>
      <SubmitButton
        onPress={formik.handleSubmit}
        isLoading={isLoading}
        text="Registrarse"
      />
      <NavigationLink
        onPress={() => navigation.navigate("Login")}
        text="¿Ya tienes una cuenta? Inicia sesión"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
});

export default SignUp;
