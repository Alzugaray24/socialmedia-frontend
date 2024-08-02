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
import colors from "../global/colors";
import { useFormik } from "formik";
import loginSchema from "../validations/Auth/Login";
import { useLoginMutation } from "../services/authService/authService";
import { setUser } from "../features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { ActivityIndicator } from "react-native";

const Login = ({ navigation }) => {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await login(values).unwrap();

        const newObj = {
          user: {
            email: response.user.email,
            name: response.user.name,
            age: response.user.age,
          },
          token: response.token,
          localId: response.user._id,
        };
        dispatch(setUser(newObj));
        Alert.alert(response.message);
      } catch (error) {
        console.log(error);
        Alert.alert(error.data.message);
      }
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <View style={styles.inputContainer}>
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
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primaryBlue} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.signupLink}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.signupText}>¿No tienes una cuenta? Regístrate</Text>
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
  signupLink: {
    marginTop: 16,
  },
  signupText: {
    color: colors.primaryBlue,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 12,
  },
});

export default Login;
