import * as yup from "yup";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Nombre es obligatorio"),
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("Correo electrónico es obligatorio"),
  age: yup
    .number()
    .typeError("Edad debe ser un número")
    .required("Edad es obligatoria")
    .positive("Edad debe ser mayor a 0")
    .integer("Edad debe ser un número entero")
    .max(99, "Edad debe ser menor o igual a 99") // Asegura que la edad sea menor o igual a 99
    .test("valid-age", "Edad no válida", (value) => {
      if (value > 99) return false; // Aquí puedes agregar la lógica adicional para edades válidas
      return true;
    }),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Contraseña es obligatoria"),
});

export default signUpSchema;
