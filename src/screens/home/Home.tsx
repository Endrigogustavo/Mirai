import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/Routes";
import { useTheme } from "../../context/ThemeContext";


export const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Calculadora{"\n"}TRL
        </Text>
        <Text style={[styles.subtitle, { color: theme.subtitle }]}>
          Uma ferramenta de mensuração{"\n"}
          que mostra o grau de maturidade de{"\n"}
          sua tecnologia!
        </Text>
      </View>

      <View style={styles.centerContent}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.buttonBackground }]}
          onPress={() => navigation.navigate("Forms")}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Iniciar Avaliação
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style={theme.statusBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 120,
    alignItems: "center",
  },
  title: {
    fontSize: 46,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
