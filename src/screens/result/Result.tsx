import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../../routes/Routes";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export const Result: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#fff" />
        <Text style={styles.title}>Resultado do TRL</Text>
      </TouchableOpacity>

      {/* Título */}

      {/* Ícone com fundo circular */}
      <View style={styles.iconWrapper}>
        <View style={styles.glow}>
          <Icon name="checkmark" size={70} color="#3b9eff" />
        </View>
      </View>

      {/* TRL 5 */}
      <Text style={styles.trlLabel}>TRL 5</Text>

      {/* Descrição */}
      <Text style={styles.description}>
        TRL 5 — Validação em Ambiente Relevante{"\n"}
        Agora sua tecnologia está além do laboratório!{"\n"}
        Os testes demonstraram que o sistema tem{"\n"}
        potencial em condições parecidas com as reais.
      </Text>

      {/* Próximo passo */}
      <Text style={styles.nextStep}>
        Próximo passo:{" "}
        <Text style={{ fontWeight: "700" }}>
          desenvolver um protótipo{"\n"}funcional para testes em campo.
        </Text>
      </Text>

      {/* Botão voltar ao início */}
      <TouchableOpacity
        style={styles.returnButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.returnText}>Voltar ao início</Text>
        <Icon name="chevron-back-outline" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1023",
    padding: 24,
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 25,
  },
  title: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",

    marginBottom: 32,
  },
  iconWrapper: {
    marginTop: 40,
    marginBottom: 24,
  },
  glow: {
    backgroundColor: "#1D2A50",
    borderRadius: 100,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  trlLabel: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 26,
  },
  description: {
    color: "#8A9AB5",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
  },
  nextStep: {
    color: "#8A9AB5",
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
    color: "#fff",
    fontSize: 18,
  },
});
