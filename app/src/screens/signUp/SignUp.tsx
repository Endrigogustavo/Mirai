import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { AuthInput } from "../../components/AuthInput";
import { AuthButton } from "../../components/AuthButton";
import { signUpUser } from "../../services/authService";
import { validatePassword } from "../../utils/validators";
import { styles } from "./SignUp.styles";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const SignUp = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSignUp = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();


    const newErrors: FormErrors = {};

    if (!trimmedName) newErrors.name = "O nome completo é obrigatório.";
    if (!trimmedEmail) {
      newErrors.email = "O e-mail é obrigatório.";
    } else if (/\s/.test(trimmedEmail)) {
      newErrors.email = "O e-mail não pode conter espaços.";
    }

    if (!trimmedPassword) {
      newErrors.password = "A senha é obrigatória.";
    } else {
      const passwordError = validatePassword(trimmedPassword);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await signUpUser({
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      });
      Alert.alert(
        "Sucesso!",
        "Sua conta foi criada. Agora você pode fazer o login.",
        [{ text: "OK", onPress: () => navigation.navigate("Login" as never) }]
      );
    } catch (error: any) {
      Alert.alert("Erro de Cadastro", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (
      setter: React.Dispatch<React.SetStateAction<string>>,
      field: keyof FormErrors
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            color={theme.text}
          />
        </TouchableOpacity>

        <View style={styles.content}>
          <Image
            source={require("../../../assets/mirai_icon.png")}
            style={styles.logo}
          />
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            Cadastre-se!
          </Text>

          <AuthInput
            iconName="account-outline"
            placeholder="Nome completo"
            value={name}
            onChangeText={handleInputChange(setName, "name")}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

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

          <AuthInput
            iconName="check-circle-outline"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChangeText={handleInputChange(
              setConfirmPassword,
              "confirmPassword"
            )}
            secureTextEntry
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}

          <AuthButton
            title="Cadastrar"
            loading={loading}
            onPress={handleSignUp}
          />
        </View>
      </ScrollView>

      <StatusBar style={theme.statusBar} />
    </KeyboardAvoidingView>
  );
};
