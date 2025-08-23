import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
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
import { styles } from "./History.styles";

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
