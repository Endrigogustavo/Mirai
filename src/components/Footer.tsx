import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../routes/Routes";
import { useTheme } from "../context/themeContext";

export const Footer = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.footer,
        {
          backgroundColor: theme.footer,
          borderColor: theme.border || "#ccc", // cor do tema para borda (fallback)
        },
      ]}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome name="home" size={28} color={theme.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("History")}>
        <Entypo name="clipboard" size={28} color={theme.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Ionicons name="settings" size={28} color={theme.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    position: "absolute",
    bottom: 15,
    width: "100%",
    borderTopWidth: 1,
  },
});
