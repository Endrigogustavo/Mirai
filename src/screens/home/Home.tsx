import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/Routes";

export const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calculadora{"\n"}TRL</Text>
        <Text style={styles.subtitle}>
          Uma ferramenta de mensuração{"\n"}
          que mostra o grau de maturidade de{"\n"}
          sua tecnologia!
        </Text>
      </View>

      <View style={styles.centerContent}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Forms")}
        >
          <Text style={styles.buttonText}>Iniciar Avaliação</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{ padding: 10 }}
        >
          <FontAwesome name="home" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("History")}
          style={{ padding: 10 }}
        >
          <Entypo name="clipboard" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0f1f",
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 46,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#a0bac7",
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
    backgroundColor: "#000",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 30,
  },
});
