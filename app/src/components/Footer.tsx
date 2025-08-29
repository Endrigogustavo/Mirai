import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../routes/Routes";
import { useTheme } from "../context/ThemeContext";

export const Footer = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.footer,
        {
          backgroundColor: theme.background,
          borderColor: theme.border || "#ccc",
        },
      ]}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome name="home" size={30} color={theme.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("History")}>
        <FontAwesome name="history" size={30} color={theme.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Ionicons name="settings" size={30} color={theme.icon} />
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
    bottom: 0,
    width: "100%",
    height: "10%",
    borderTopWidth: 1,
  },
});
