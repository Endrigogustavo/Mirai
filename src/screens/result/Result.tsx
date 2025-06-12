import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../../routes/Routes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/themeContext";

export const Result: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Botão de voltar */}
      <TouchableOpacity style={[styles.backButton, { backgroundColor: theme }]} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color={theme.icon} />
        <Text style={[styles.title, { color: theme.text }]}>Resultado do TRL</Text>
      </TouchableOpacity>

      {/* Ícone com fundo circular */}
      <View style={styles.iconWrapper}>
        <View style={[styles.glow, { backgroundColor: theme }]}>
          <Icon name="checkmark" size={70} color="#3b9eff" />
        </View>
      </View>

      {/* TRL 5 */}
      <Text style={[styles.trlLabel, { color: theme.text }]}>TRL 5</Text>

      {/* Descrição */}
      <Text style={[styles.description, { color: theme.subtitle }]}>
        TRL 5 — Validação em Ambiente Relevante{"\n"}
        Agora sua tecnologia está além do laboratório!{"\n"}
        Os testes demonstraram que o sistema tem{"\n"}
        potencial em condições parecidas com as reais.
      </Text>

      {/* Próximo passo */}
      <Text style={[styles.nextStep, { color: theme.subtitle }]}>
        Próximo passo:{" "}
        <Text style={{ fontWeight: "700", color: theme.text }}>
          desenvolver um protótipo{"\n"}funcional para testes em campo.
        </Text>
      </Text>

      {/* Botão voltar ao início */}
      <TouchableOpacity
        style={[styles.returnButton, { backgroundColor: theme, borderRadius: 8, padding: 10 }]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={[styles.returnText, { color: theme.text }]}>Voltar ao início</Text>
        <Icon name="chevron-back-outline" size={32} color={theme.text} />
      </TouchableOpacity>

      {/* Botão de alternar tema */}
      <TouchableOpacity
        style={{ position: "absolute", top: 20, right: 20 }}
        onPress={toggleTheme}
      >
        <Icon name="moon" size={24} color={theme.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 45,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 32,
  },
  iconWrapper: {
    marginTop: 40,
    marginBottom: 24,
  },
  glow: {
    borderRadius: 100,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  trlLabel: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 26,
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
  },
  nextStep: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 40,
  },
  returnButton: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 190,
  },
  returnText: {
    fontSize: 18,
  },
});
