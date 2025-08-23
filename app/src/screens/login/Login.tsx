import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { useTheme } from "../../context/ThemeContext";
import { AuthInput } from "../../components/AuthInput";
import { AuthButton } from "../../components/AuthButton";
import { signInUser } from "../../services/authService";
import { styles } from "./Login.styles";
import { RootStackParamList } from "../../routes/Routes";

interface LoginErrors {
  email?: string;
  password?: string;
}

export const Login = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleLogin = async () => {
    const newErrors: LoginErrors = {};

    if (!email) newErrors.email = "O e-mail é obrigatório.";
    if (!password) newErrors.password = "A senha é obrigatória.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await signInUser({ email, password });
      navigation.navigate("Home" as never);
    } catch (error: any) {
      Alert.alert("Erro de Login", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (
      setter: React.Dispatch<React.SetStateAction<string>>,
      field: keyof LoginErrors
    ) =>
      (text: string) => {
        setter(text);
        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.content}>
        <Image
          source={require("../../../assets/mirai_icon.png")}
          style={styles.logo}
        />

        <AuthInput
          iconName="email-outline"
          placeholder="E-mail"
          value={email}
          onChangeText={handleInputChange(setEmail, "email")}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <AuthInput
          iconName="key-variant"
          placeholder="Senha"
          value={password}
          onChangeText={handleInputChange(setPassword, "password")}
          secureTextEntry
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <View style={styles.buttonsContainer}>
          <AuthButton title="Entrar" onPress={handleLogin} loading={loading} />
          <AuthButton
            title="Cadastrar"
            variant="secondary"
            onPress={() => navigation.navigate("SignUp" as never)}
          />
        </View>

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate("ForgotPassword" as never)}
        >
          <Text
            style={[styles.forgotPasswordText, { color: theme.textPrimary }]}
          >
            Esqueceu sua senha?
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style={theme.statusBar} />
    </KeyboardAvoidingView>
  );
};
