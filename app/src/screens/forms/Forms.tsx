import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../../routes/Routes";
import { useTheme } from "../../context/ThemeContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";

import { styles } from "./Forms.styles";

const steps = [
  {
    level: "TRL 1",
    question:
      "Os princípios básicos da tecnologia foram observados e relatados?",
    subtext:
      "(Pesquisa básica. O conceito científico foi postulado, mas não há prova experimental.)",
  },
  {
    level: "TRL 2",
    question:
      "O conceito da tecnologia e/ou sua aplicação prática foram formulados?",
    subtext:
      "(A invenção começa. A aplicação prática é especulada, mas não há prova de conceito.)",
  },
  {
    level: "TRL 3",
    question: "Uma prova de conceito analítica ou experimental foi realizada?",
    subtext:
      "(Ex: estudos em laboratório para validar que a função crítica da tecnologia funciona.)",
  },
  {
    level: "TRL 4",
    question:
      "Os componentes da tecnologia foram validados em ambiente de laboratório?",
    subtext:
      "(As 'peças' individuais do sistema foram montadas e testadas em um ambiente controlado.)",
  },
  {
    level: "TRL 5",
    question:
      "Os componentes foram validados em um ambiente relevante (simulado)?",
    subtext:
      "(As 'peças' foram testadas juntas em um ambiente que simula as condições reais.)",
  },
  {
    level: "TRL 6",
    question:
      "Um protótipo do sistema foi demonstrado em um ambiente relevante (simulado)?",
    subtext:
      "(Um modelo funcional e de alta fidelidade do sistema foi testado em um ambiente simulado.)",
  },
  {
    level: "TRL 7",
    question:
      "Um protótipo do sistema foi demonstrado no ambiente operacional real?",
    subtext:
      "(O protótipo foi testado em campo, no espaço, ou onde quer que vá operar de verdade.)",
  },
  {
    level: "TRL 8",
    question:
      "O sistema final está completo e qualificado através de testes e demonstrações?",
    subtext:
      "(A versão final da tecnologia passou em todos os testes e é considerada 'pronta para a missão'.)",
  },
  {
    level: "TRL 9",
    question: "O sistema real foi comprovado em uma missão bem-sucedida?",
    subtext:
      "(A tecnologia foi utilizada com sucesso em uma operação real, provando seu valor e confiabilidade.)",
  },
];

const PASSING_THRESHOLD = 3;
const questionToTrlMap = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 7,
  7: 8,
  8: 9,
};


export const Forms: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(steps.length).fill(null)
  );
  const [loading, setLoading] = useState(false);

  const calculateTRL = (currentAnswers: (number | null)[]) => {
    let achievedTRL = 0;
    for (let i = 0; i < currentAnswers.length; i++) {
      const answer = currentAnswers[i];
      if (answer === null || answer < PASSING_THRESHOLD) {
        break;
      }
      achievedTRL = questionToTrlMap[i as keyof typeof questionToTrlMap];
    }
    return achievedTRL;
  };

  const saveDataAndNavigate = async () => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      Alert.alert("Erro de Autenticação", "Você não está logado.");
      return;
    }

    const finalTRLValue = calculateTRL(answers);
    const finalTRLLabel = finalTRLValue > 0 ? `TRL ${finalTRLValue}` : "TRL 0";

    try {
      await addDoc(collection(db, "results"), {
        userId: user.uid,
        answers: answers,
        createdAt: serverTimestamp(),
        trlLevel: finalTRLLabel,
        title: `Avaliação TRL - ${new Date().toLocaleDateString()}`,
      });
      navigation.navigate("Result", { answers });
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      Alert.alert("Erro", "Não foi possível salvar seu resultado.");
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async () => {
    setLoading(true);
    await saveDataAndNavigate();
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSelect = (value: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = value;
    setAnswers(updatedAnswers);
  };

  const step = steps[currentStep];
  const selected = answers[currentStep];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home" as never)}
      >
        <Icon name="arrow-back" size={24} color={theme.text} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconContainer}>
          <Icon name="document-text-outline" size={150} color="#3b9eff" />
        </View>
        <Text style={[styles.question, { color: theme.text }]}>
          {step.question}
        </Text>
        <Text style={[styles.subtext, { color: theme.subtitle }]}>
          {step.subtext}
        </Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity
              key={num}
              onPress={() => handleSelect(num)}
              style={[
                styles.circle,
                {
                  backgroundColor:
                    selected === num ? "#3b9eff" : theme.inputBackground,
                },
              ]}
            >
              <Text
                style={[
                  styles.number,
                  { color: selected === num ? "#FFF" : theme.text },
                ]}
              >
                {num}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.navigationButtons}>
        {currentStep > 0 && (
          <TouchableOpacity
            style={[
              styles.navButton,
              { backgroundColor: theme.inputBackground },
            ]}
            onPress={handleBack}
          >
            <Icon name="chevron-back-outline" size={24} color={theme.text} />
            <Text style={[styles.navButtonText, { color: theme.text }]}>
              Voltar
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.navButton,
            {
              backgroundColor: "#3b9eff",
              opacity: selected === null ? 0.5 : 1,
              marginLeft: currentStep > 0 ? 0 : "auto",
            },
          ]}
          onPress={handleNext}
          disabled={selected === null || loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Text style={[styles.navButtonText, { color: "#FFFFFF" }]}>
                {currentStep === steps.length - 1 ? "Finalizar" : "Próximo"}
              </Text>
              <Icon name="chevron-forward-outline" size={24} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
