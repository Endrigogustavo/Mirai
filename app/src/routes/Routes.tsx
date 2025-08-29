import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Footer } from "../components/Footer";
import { Home, History, Forms, Result, Settings } from "../screens";
import { Login } from "../screens/login/Login";
import { SignUp } from "../screens/signUp/SignUp";
import { SafeAreaView } from 'react-native-safe-area-context';

export type RootStackParamList = {
  Home: undefined;
  History: undefined;
  Forms: undefined;
  Login: undefined;
  SignUp: undefined;
  Settings: undefined;
  Result: { answers: (number | null)[] };
};

const screensWithoutFooter: Array<keyof RootStackParamList> = [
  "Login",
  "SignUp",
];

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
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
  );
};

export const Routes = () => {
  const [routeName, setRouteName] = useState<
    keyof RootStackParamList | undefined
  >("Login");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <NavigationContainer
          onStateChange={(state) => {
            if (state) {
              const currentRoute = state.routes[state.index];
              const currentRouteName =
                getFocusedRouteNameFromRoute(currentRoute) ?? currentRoute.name;
              setRouteName(currentRouteName as keyof RootStackParamList);
            }
          }}
        >
          <AppNavigator />
          {routeName && !screensWithoutFooter.includes(routeName) && <Footer />}
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
