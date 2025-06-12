import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../../routes/Routes";
import { useTheme } from "../../context/themeContext";

export const Forms: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selected, setSelected] = useState<number | null>(1);
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Botão para alternar tema */}
      <TouchableOpacity
        style={{ position: "absolute", top: 20, right: 20 }}
        onPress={toggleTheme}
      >
        <Icon name="moon" size={24} color={theme.icon} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: theme }]}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="arrow-back" size={24} color={theme.icon} />
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <View
          style={[
            styles.glow,
            { backgroundColor: theme }, // use buttonBackground para glow
          ]}
        >
          <Icon name="document-text-outline" size={150} color="#3b9eff" />
        </View>
      </View>

      <Text style={[styles.question, { color: theme.text }]}>
        A tecnologia foi conceituada e seus{"\n"}
        princípios básicos foram observados?
      </Text>

      <Text style={[styles.subtext, { color: theme.subtitle }]}>
        (Ex: você sabe cientificamente que ela{"\n"}pode funcionar?)
      </Text>

      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => setSelected(num)}
            style={[
              styles.circle,
              {
                backgroundColor:
                  selected === num ? theme.buttonText : theme.circle,
              },
            ]}
          >
            <Text
              style={[
                styles.number,
                { color: selected === num ? theme.buttonBackground : theme.background },
              ]}
            >
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.returnButton,
          { backgroundColor: theme, borderRadius: 8, padding: 10 },
        ]}
        onPress={() => navigation.navigate("Result")}
      >
        <Text style={[styles.returnText, { color: theme.text }]}>Proximo</Text>
        <Icon name="chevron-forward-outline" size={32} color={theme.text} />
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
    marginTop: 35,
    alignSelf: "flex-start",
  },
  iconContainer: {
    marginVertical: 32,
    marginTop: 40,
  },
  glow: {
    borderRadius: 50,
    padding: 20,
  },
  question: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  ratingContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontWeight: "bold",
  },
  returnButton: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 230,
  },
  returnText: {
    fontSize: 18,
  },
});
