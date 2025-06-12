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
import { useTheme } from "../../context/themeContext";
import projects from '../../database/project.json';


export const History = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" size={35} color={theme.arrow} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: theme.text }]}>
          Histórico do TRL
        </Text>
      </View>

      {/* Central Icon */}
      <View style={styles.iconWrapper}>
        <Entypo name="clipboard" size={88} color={theme.icon} />
      </View>

      {/* Title */}
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Seus resultados anteriores:
      </Text>

      {/* List */}
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View
              style={[
                styles.circle,
                {
                  borderColor: theme.icon,
                },
              ]}
            >
              <Text style={[styles.circleText, { color: theme.icon }]}>
                {item.id}
              </Text>
            </View>
            <Text style={[styles.projectText, { color: theme.text }]}>
              {item.title}
            </Text>
          </View>
        )}
      />

      <StatusBar style={theme.mode === "light" ? "dark" : "light"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
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
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  circleText: {
    fontWeight: "bold",
  },
  projectText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
