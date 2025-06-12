// src/routes/index.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Footer } from "../components/Footer";
import { Home, History, Forms, Result, Settings } from "../screens";

export type RootStackParamList = {
  Home: undefined;
  History: undefined;
  Forms: undefined;
  Result: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Forms" component={Forms} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
};
