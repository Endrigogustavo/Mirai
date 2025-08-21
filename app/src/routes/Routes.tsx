import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Footer } from "../components/Footer";
import { Home, History, Forms, Result, Settings } from "../screens";
import { Login } from "../screens/login/Login";
import { SignUp } from "../screens/signUp/SignUp";

export type RootStackParamList = {
  Home: undefined;
  History: undefined;
  Forms: undefined;
  Login: undefined;
  SignUp: undefined;
  Settings: undefined;
  Result: { answers: (number | null)[] };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Forms" component={Forms} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
};
