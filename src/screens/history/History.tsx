import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome, Entypo, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/Routes";

const projects = [
  { id: "1", title: "Projeto A - TRL 3" },
  { id: "2", title: "Projeto B - TRL 7" },
  { id: "3", title: "Projeto C - TRL 8" },
  { id: "4", title: "Projeto D - TRL 2" },
];

export const History = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" size={35} color="#385e96" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Histórico do TRL</Text>
      </View>

      {/* Central Icon */}
      <View style={styles.iconWrapper}>
        <Entypo name="clipboard" size={88} color="#7eb0ff" />
      </View>

      {/* Title */}
      <Text style={styles.subtitle}>Seus resultados anteriores:</Text>

      {/* List */}
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>{item.id}</Text>
            </View>
            <Text style={styles.projectText}>{item.title}</Text>
          </View>
        )}
      />

      {/* Footer */}
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
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  iconWrapper: {
    marginTop: 80,
    alignItems: "center",
  },
  subtitle: {
    marginTop: 50,
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  list: {
    marginTop: 50,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#7eb0ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  circleText: {
    color: "#7eb0ff",
    fontWeight: "bold",
  },
  projectText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 30,
    marginTop: "auto",
  },
});
