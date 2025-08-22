import { StatusBar } from "expo-status-bar";
import {  Text, View, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/Routes";
import { useTheme } from "../../context/ThemeContext";
import { styles } from "./Home.styles";


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