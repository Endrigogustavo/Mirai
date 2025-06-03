// src/screens/QuestionScreen.tsx

import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../../routes/Routes";

export const Forms: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selected, setSelected] = useState<number | null>(1);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <View style={styles.glow}>
          <Icon name="document-text-outline" size={150} color="#3b9eff" />
        </View>
      </View>

      <Text style={styles.question}>
        A tecnologia foi conceituada e seus{"\n"}
        princípios básicos foram observados?
      </Text>

      <Text style={styles.subtext}>
        (Ex: você sabe cientificamente que ela{"\n"}pode funcionar?)
      </Text>

      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => setSelected(num)}
            style={[styles.circle, selected === num && styles.selectedCircle]}
          >
            <Text style={styles.number}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.returnButton}
        onPress={() => navigation.navigate("Result")}
      >
        <Text style={styles.returnText}>Proximo</Text>
        <Icon name="chevron-forward-outline" size={32} color="#fff" />
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
    marginTop: 20,
    alignSelf: "flex-start",
  },
  iconContainer: {
    marginVertical: 32,
    marginTop: 40,
  },
  glow: {
    backgroundColor: "#1D2A50",
    borderRadius: 50,
    padding: 20,
  },
  question: {
    color: "#a0bac7",
    fontSize: 16,

    textAlign: "center",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: "#a0bac7",
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
    backgroundColor: "#1D2A50",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCircle: {
    backgroundColor: "#3B9EFF",
  },
  number: {
    color: "#fff",
    fontWeight: "bold",
  },
  face: {
    fontSize: 18,
  },
  returnButton: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 230,
  },
  returnText: {
    color: "#fff",
    fontSize: 18,
  },
});
