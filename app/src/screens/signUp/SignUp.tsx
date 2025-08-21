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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

export const SignUp = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      Alert.alert(
        "Sucesso!",
        "Sua conta foi criada. Agora você pode fazer o login.",
        [
          { 
            text: "OK", 
            onPress: () => navigation.navigate("Login" as never) 
          }
        ]
      );

    } catch (error: any) {
      console.error("Erro no cadastro:", error.code);
      let errorMessage = "Ocorreu um erro ao criar a conta.";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Este e-mail já está em uso por outra conta.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "O formato do e-mail é inválido.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "A senha é muito fraca. Use pelo menos 6 caracteres.";
      }
      
      Alert.alert("Erro de Cadastro", errorMessage);

    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
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

        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.inputBackground },
          ]}
        >
          <MaterialCommunityIcons
            name="account-outline"
            size={22}
            color={theme.iconColor}
            style={styles.icon}
          />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Nome completo"
            placeholderTextColor={theme.subtitle}
            value={name}
            onChangeText={setName}
          />
        </View>
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
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.inputBackground },
          ]}
        >
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={22}
            color={theme.iconColor}
            style={styles.icon}
          />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Confirmar senha"
            placeholderTextColor={theme.subtitle}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { color: theme.textPrimary }]}>
            {loading ? "Cadastrando..." : "Cadastrar"}
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
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
  content: {
    paddingHorizontal: 34,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
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
  button: {
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
