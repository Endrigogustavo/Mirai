import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

interface AuthButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: "primary" | "secondary";
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  loading = false,
  variant = "primary",
  ...props
}) => {
  const { theme } = useTheme();

  const isPrimary = variant === "primary";

  const buttonStyle = isPrimary
    ? { backgroundColor: theme.primary }
    : { borderColor: theme.secondary, borderWidth: 1 };

  const textStyle = { color: theme.textPrimary };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={theme.textPrimary} />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
