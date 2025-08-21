import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { RootStackParamList } from "../../routes/Routes";
import { useTheme } from "../../context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";

interface HistoryItem {
  id: string;
  title: string;
  trlLevel: string;
  createdAt: {
    toDate: () => Date;
  };
}

export const History: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        setLoading(true);
        const user = auth.currentUser;

        if (!user) {
          Alert.alert(
            "Usuário não encontrado",
            "Por favor, faça login novamente."
          );
          setLoading(false);
          navigation.navigate("Login" as never);
          return;
        }

        try {
          const q = query(
            collection(db, "results"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
          );

          const querySnapshot = await getDocs(q);
          const userHistory: HistoryItem[] = [];

          querySnapshot.forEach((doc) => {
            userHistory.push({ id: doc.id, ...doc.data() } as HistoryItem);
          });

          setHistory(userHistory);
        } catch (error) {
          console.error("Erro ao buscar histórico: ", error);
          Alert.alert(
            "Erro",
            "Não foi possível carregar o histórico. Verifique sua conexão."
          );
        } finally {
          setLoading(false);
        }
      };

      fetchHistory();
    }, [])
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: HistoryItem;
    index: number;
  }) => (
    <TouchableOpacity style={styles.listItem}>
      <View style={[styles.circle, { borderColor: theme.text }]}>
        <Text style={[styles.circleText, { color: theme.text }]}>
          {history.length - index}
        </Text>
      </View>
      <View style={styles.itemTextContainer}>
        <Text style={[styles.projectText, { color: theme.text }]}>
          {item.title || "Avaliação"}
        </Text>
        <Text style={[styles.subText, { color: theme.subtitle }]}>
          Resultado: {item.trlLevel}
        </Text>
        <Text style={[styles.subText, { color: theme.subtitle }]}>
          Data:{" "}
          {item.createdAt
            ? item.createdAt.toDate().toLocaleDateString("pt-BR")
            : "N/A"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: theme.text }]}>
        Nenhum histórico encontrado.
      </Text>
      <Text style={[styles.emptySubText, { color: theme.subtitle }]}>
        Faça sua primeira avaliação para ver os resultados aqui.
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={theme.statusBar} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: theme.text }]}>
          Histórico de Avaliações
        </Text>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingHorizontal: 24,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  circleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemTextContainer: {
    flex: 1,
  },
  projectText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    marginTop: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    textAlign: "center",
  },
});
