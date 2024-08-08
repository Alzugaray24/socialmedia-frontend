import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Camara from "../../screens/Camara";

const Stack = createNativeStackNavigator();

export default function ImageStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Camara"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Camara" component={Camara} />
    </Stack.Navigator>
  );
}
