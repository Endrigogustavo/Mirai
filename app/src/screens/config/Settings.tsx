import { View, ScrollView, Alert } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {
  Switch,
  List,
  Divider,
  TouchableRipple,
  Text,
} from "react-native-paper";

import { useTheme } from "../../context/ThemeContext";
import { styles } from "./Settings.styles";
import { RootStackParamList } from "../../routes/Routes";
import { signOutUser, deleteCurrentUserAccount } from "../../services/authService";

export const Settings = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const showComingSoon = (feature: string) => {
    Alert.alert("Em breve", `${feature} será implementado futuramente.`);
  };

  const handleLogout = () => {
    Alert.alert(
      "Confirmar Saída",
      "Você tem certeza que deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            try {
              await signOutUser();
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            } catch (error: any) {
              Alert.alert("Erro ao Sair", error.message);
            }
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Excluir Conta Permanentemente",
      "Esta ação é irreversível. Todos os seus dados serão apagados. Você tem certeza?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir Conta",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCurrentUserAccount();
              Alert.alert(
                "Conta Excluída",
                "Sua conta e todos os seus dados foram removidos com sucesso."
              );
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            } catch (error: any) {
              if (error.message.includes("Sua sessão expirou")) {
                Alert.alert(
                  "Sessão Expirada",
                  "Por segurança, você precisa fazer login novamente antes de poder excluir sua conta.",
                  [
                    {
                      text: "Sair e Fazer Login",
                      onPress: async () => {
                        await signOutUser();
                        navigation.reset({
                          index: 0,
                          routes: [{ name: "Login" }],
                        });
                      },
                    },
                    {
                      text: "Cancelar",
                      style: "cancel",
                    },
                  ]
                );
              } else {
                Alert.alert("Erro ao Excluir", error.message);
              }
            }
          },
        },
      ]
    );
  };


  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.headerText, { color: theme.text }]}>
        Configurações
      </Text>

      <List.Section style={styles.section}>
        <List.Subheader style={[styles.subheader, { color: theme.text }]}>
          Preferências
        </List.Subheader>

        <TouchableRipple onPress={toggleTheme}>
          <View style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <List.Icon
                color={theme.icon}
                icon={isDark ? "weather-night" : "white-balance-sunny"}
              />
              <Text style={[styles.optionLabel, { color: theme.text }]}>
                Tema Escuro
              </Text>
            </View>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>
        </TouchableRipple>

        <Divider style={styles.divider} />

        {/* TODO As funcionalidades abaixo estão comentadas para implementação futura */}
        {/* 
        <List.Item
          title="Alterar Idioma"
          titleStyle={[styles.itemTitle, { color: theme.text }]}
          onPress={() => showComingSoon("Alterar Idioma")}
          left={() => <List.Icon color={theme.icon} icon="translate" />}
        />
        <Divider style={styles.divider} />


        <List.Item
          title="Notificações"
          titleStyle={[styles.itemTitle, { color: theme.text }]}
          onPress={() => showComingSoon("Notificações")}
          left={() => <List.Icon color={theme.icon} icon="bell-outline" />}
        />
        <Divider style={styles.divider} />

        <List.Item
          title="Backup e Restauração"
          titleStyle={[styles.itemTitle, { color: theme.text }]}
          onPress={() => showComingSoon("Backup")}
          left={() => (
            <List.Icon color={theme.icon} icon="cloud-upload-outline" />
          )}
        /> 
        */}
      </List.Section>

      {/* Seção da Calculadora comentada para implementação futura */}
      {/* 
      <List.Section style={styles.section}>
        <List.Subheader style={[styles.subheader, { color: theme.text }]}>
          Calculadora
        </List.Subheader>

        {[
          { title: "Reiniciar Avaliação", icon: "refresh" },
          { title: "Histórico de Avaliações", icon: "history" },
          { title: "Editar Parâmetros", icon: "tune" },
          { title: "Ajuda sobre os Critérios", icon: "help-circle-outline" },
          { title: "Visualizar Resultados", icon: "chart-bar" },
          { title: "Comparar Avaliações", icon: "compare" },
          { title: "Exportar Avaliação", icon: "export" },
          { title: "Compartilhar Resultados", icon: "share-variant" },
        ].map((item, idx) => (
          <View key={idx}>
            <List.Item
              title={item.title}
              titleStyle={[styles.itemTitle, { color: theme.text }]}
              onPress={() => showComingSoon(item.title)}
              left={() => <List.Icon color={theme.icon} icon={item.icon} />}
            />
            {idx < 7 && <Divider style={styles.divider} />}
          </View>
        ))}
      </List.Section> 
      */}

      <List.Section style={styles.section}>
        <List.Subheader style={[styles.subheader, { color: theme.text }]}>
          Conta
        </List.Subheader>

        <List.Item
          title="Excluir Minha Conta"
          description="Esta ação é permanente"
          descriptionStyle={{ color: "#D32F2F", opacity: 0.7 }}
          titleStyle={[styles.itemTitle, { color: "#D32F2F" }]}
          onPress={handleDeleteAccount}
          left={() => <List.Icon color={"#D32F2F"} icon="account-remove-outline" />}
        />

        <Divider style={styles.divider} />

        <List.Item
          title="Sair da Conta"
          titleStyle={[styles.itemTitle, { color: theme.text }]}
          onPress={handleLogout}
          left={() => <List.Icon color={theme.icon} icon="logout" />}
        />

      </List.Section>
    </ScrollView>
  );
};
