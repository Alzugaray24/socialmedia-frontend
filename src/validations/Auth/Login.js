import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("Correo electrónico es obligatorio"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Contraseña es obligatoria"),
});

export default loginSchema;
