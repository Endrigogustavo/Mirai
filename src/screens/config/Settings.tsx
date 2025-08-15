import React from "react";
import { View, ScrollView, Alert, StyleSheet, Platform } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import {
  Switch,
  List,
  Divider,
  TouchableRipple,
  Text,
} from "react-native-paper";

export const Settings = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  const showComingSoon = (feature: string) => {
    Alert.alert("Em breve", `${feature} será implementado futuramente.`);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.headerText, { color: theme.text }]}>Configurações</Text>

      {/* Seção de Preferências */}
      <List.Section style={styles.section}>
        <List.Subheader style={[styles.subheader, { color: theme.text }]}>Preferências</List.Subheader>

        <TouchableRipple onPress={toggleTheme}>
          <View style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <List.Icon color={theme.icon} icon={isDark ? "weather-night" : "white-balance-sunny"} />
              <Text style={[styles.optionLabel, { color: theme.text }]}>Tema Escuro</Text>
            </View>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>
        </TouchableRipple>

        <Divider style={styles.divider} />

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
          left={() => <List.Icon color={theme.icon} icon="cloud-upload-outline" />}
        />
      </List.Section>

      {/* Seção de Calculadora */}
      <List.Section style={styles.section}>
        <List.Subheader style={[styles.subheader, { color: theme.text }]}>Calculadora</List.Subheader>

        {[{ title: "Reiniciar Avaliação", icon: "refresh" },
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
            <Divider style={styles.divider} />
          </View>
        ))}
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 24,
  },
  contentContainer: {
    paddingBottom: 100,  // Ajuste o valor conforme necessário para dar espaço abaixo
  },
  headerText: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 32,
    paddingLeft: 4,
  },
  section: {
    marginBottom: 32,
  },
  subheader: {
    fontSize: 18,
    marginBottom: 8,
    marginLeft: -10,
    fontWeight: "600",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 4,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: "500",
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: "400",
  },
  divider: {
    marginVertical: 4,
  },
});
