import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

export const Login = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha o e-mail e a senha.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      Alert.alert("Sucesso!", "O Login foi realizado com sucesso.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home" as never),
        },
      ]);
    } catch (error: any) {
      console.error("Erro de login:", error.code);
      let errorMessage = "Ocorreu um erro ao tentar fazer login.";

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        errorMessage = "E-mail ou senha inválidos.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "O formato do e-mail é inválido.";
      }

      Alert.alert("Erro de Login", errorMessage);
    } finally {
      setLoading(false);
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

        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.inputBackground },
          ]}
        >
          <MaterialCommunityIcons
            name="email-outline"
            size={22}
            color={theme.iconColor}
            style={styles.icon}
          />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="E-mail"
            placeholderTextColor={theme.subtitle}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.inputBackground },
          ]}
        >
          <MaterialCommunityIcons
            name="key-variant"
            size={22}
            color={theme.iconColor}
            style={styles.icon}
          />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Senha"
            placeholderTextColor={theme.subtitle}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonPrimary,
              { backgroundColor: theme.primary },
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={[styles.buttonText, { color: theme.textPrimary }]}>
              {loading ? "Entrando..." : "Entrar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonSecondary,
              { borderColor: theme.secondary },
            ]}
            onPress={() => navigation.navigate("SignUp" as never)}
          >
            <Text style={[styles.buttonText, { color: theme.textPrimary }]}>
              Cadastrar
            </Text>
          </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 34,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    borderRadius: 30,
    marginBottom: 20,
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 15,
  },
  button: {
    flex: 1,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPrimary: {},
  buttonSecondary: {
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPasswordButton: {
    alignSelf: "center",
    marginTop: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
});
