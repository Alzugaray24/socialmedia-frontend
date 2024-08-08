import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import { useFormik } from "formik";
import loginSchema from "../validations/Auth/Login";
import { useLoginMutation } from "../services/authService/authService";
import { setUser } from "../features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import TextInputField from "../components/Auth/TextInputField";
import SubmitButton from "../components/Auth/SubmitButton";
import NavigationLink from "../components/Auth/NavigationLink";
import colors from "../global/colors";

const Login = ({ navigation }) => {
  const [login, { isLoading }] = useLoginMutation();
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

        console.log(response);

        const newObj = {
          user: {
            email: response.user.email,
            name: response.user.name,
            lastName: response.user.lastName,
            age: response.user.age,
            id: response.user._id,
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
        <TextInputField
          placeholder="Correo electrónico"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          errorMessage={formik.touched.email && formik.errors.email}
          keyboardType="email-address"
        />
        <TextInputField
          placeholder="Contraseña"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          errorMessage={formik.touched.password && formik.errors.password}
          secureTextEntry
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primaryBlue} />
      ) : (
        <SubmitButton
          onPress={formik.handleSubmit}
          isLoading={isLoading}
          text="Login"
        />
      )}
      <NavigationLink
        text="¿No tienes una cuenta? Regístrate"
        onPress={() => navigation.navigate("SignUp")}
        style={styles.signupLink}
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
  signupLink: {
    marginTop: 16,
    color: colors.primaryBlue,
  },
});

export default Login;
