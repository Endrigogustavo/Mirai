import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

interface AuthInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}

export const AuthInput: React.FC<AuthInputProps> = ({ iconName, ...props }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.inputContainer,
        { backgroundColor: theme.inputBackground },
      ]}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={22}
        color={theme.iconColor}
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, { color: theme.text }]}
        placeholderTextColor={theme.subtitle}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    borderRadius: 30,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
});
