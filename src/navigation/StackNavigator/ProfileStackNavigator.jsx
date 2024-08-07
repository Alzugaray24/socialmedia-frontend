import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "../../screens/Profile";
import ImageSelector from "../../screens/ImageSelector";

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MyProfile" component={Profile} />
      <Stack.Screen name="ImageSelector" component={ImageSelector} />
    </Stack.Navigator>
  );
}
