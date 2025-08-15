// Result.tsx

import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../../routes/Routes";
import {
	NavigationProp,
	useNavigation,
	useRoute,
	RouteProp,
} from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";

type ResultScreenRouteProp = RouteProp<RootStackParamList, "Result">;

const PASSING_THRESHOLD = 3;

const trlData = {
	0: {
		title: "TRL 0",
		description:
			"Ideia. Conceito não comprovado.\nÉ necessário formular e observar os princípios básicos da tecnologia.",
		nextStep: "realizar a pesquisa básica para validar os princípios.",
	},
	1: {
		title: "TRL 1",
		description:
			"TRL 1 — Princípios Básicos Observados\nOs conceitos científicos foram estabelecidos, mas ainda não há prova experimental.",
		nextStep: "formular o conceito da tecnologia e sua aplicação.",
	},
	2: {
		title: "TRL 2",
		description:
			"TRL 2 — Conceito da Tecnologia Formulado\nO conceito e a aplicação prática foram definidos, mas a viabilidade ainda precisa ser provada.",
		nextStep: "realizar uma prova de conceito experimental (PoC).",
	},
	3: {
		title: "TRL 3",
		description:
			"TRL 3 — Prova de Conceito Experimental\nA função crítica da tecnologia foi validada em laboratório, provando que funciona.",
		nextStep: "validar os componentes do sistema em laboratório.",
	},
	4: {
		title: "TRL 4",
		description:
			"TRL 4 — Validação de Componentes em Laboratório\nAs 'peças' do sistema foram integradas e testadas em um ambiente controlado.",
		nextStep: "validar os componentes em um ambiente relevante (simulado).",
	},
	5: {
		title: "TRL 5",
		description:
			"TRL 5 — Validação de Componentes em Ambiente Relevante\nO sistema foi testado em um ambiente simulado, próximo das condições reais.",
		nextStep: "demonstrar um protótipo do sistema em ambiente relevante.",
	},
	6: {
		title: "TRL 6",
		description:
			"TRL 6 — Protótipo do Sistema em Ambiente Relevante\nUm protótipo de alta fidelidade foi testado com sucesso em um ambiente simulado.",
		nextStep: "demonstrar o protótipo no ambiente operacional real.",
	},
	7: {
		title: "TRL 7",
		description:
			"TRL 7 — Demonstração do Protótipo em Ambiente Operacional\nO protótipo foi testado com sucesso no ambiente real (campo, espaço, etc.).",
		nextStep: "completar e qualificar o sistema final.",
	},
	8: {
		title: "TRL 8",
		description:
			"TRL 8 — Sistema Completo e Qualificado\nA tecnologia está completa e passou por todos os testes de qualificação. 'Pronta para a missão'.",
		nextStep: "comprovar o sistema em uma missão real bem-sucedida.",
	},
	9: {
		title: "TRL 9",
		description:
			"TRL 9 — Sistema Comprovado em Missão\nParabéns! A tecnologia foi utilizada com sucesso em operações reais, provando sua total maturidade.",
		nextStep: "considerar otimizações ou novas gerações da tecnologia.",
	},
};

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

export const Result: React.FC = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { theme } = useTheme();
	const route = useRoute<ResultScreenRouteProp>();
	const { answers } = route.params;

	const calculateTRL = () => {
		let achievedTRL = 0;
		for (let i = 0; i < answers.length; i++) {
			const answer = answers[i];
			if (answer === null || answer < PASSING_THRESHOLD) {
				break;
			}
			achievedTRL = questionToTrlMap[i as keyof typeof questionToTrlMap];
		}
		return achievedTRL;
	};

	const finalTRLValue = calculateTRL();
	const resultDisplay = trlData[finalTRLValue as keyof typeof trlData];
	const isSuccess = finalTRLValue > 0;

	return (
		<ScrollView
			contentContainerStyle={[
				styles.container,
				{ backgroundColor: theme.background },
			]}
		>
			<TouchableOpacity
				style={styles.backButton}
				onPress={() => navigation.goBack()}
			>
				<Icon name="arrow-back" size={24} color={theme.icon} />
				<Text style={[styles.title, { color: theme.text }]}>
					Resultado do TRL
				</Text>
			</TouchableOpacity>

			<View style={styles.iconWrapper}>
				<View style={[styles.glow, { backgroundColor: theme.circle }]}>
					<Icon
						name={
							isSuccess ? "checkmark-circle-outline" : "close-circle-outline"
						}
						size={70}
						color={isSuccess ? "#3b9eff" : "#ff4d4d"}
					/>
				</View>
			</View>

			<Text style={[styles.trlLabel, { color: theme.text }]}>
				{resultDisplay.title}
			</Text>
			<Text style={[styles.description, { color: theme.subtitle }]}>
				{resultDisplay.description}
			</Text>
			<Text style={[styles.nextStep, { color: theme.subtitle }]}>
				Próximo passo:{" "}
				<Text style={{ fontWeight: "700", color: theme.text }}>
					{resultDisplay.nextStep}
				</Text>
			</Text>

			<TouchableOpacity
				style={[
					styles.returnButton,
					{ backgroundColor: theme.circle, borderRadius: 8 },
				]}
				onPress={() => navigation.navigate("Home")}
			>
				<Text style={[styles.returnText, { color: theme.text }]}>
					Voltar ao início
				</Text>
				<Icon name="home-outline" size={24} color={theme.text} />
			</TouchableOpacity>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	backButton: {
		position: "absolute",
		top: 50,
		left: 24,
		flexDirection: "row",
		alignItems: "center",
	},
	title: {
		marginLeft: 10,
		fontSize: 18,
		fontWeight: "600",
	},
	iconWrapper: {
		marginBottom: 24,
	},
	glow: {
		width: 130,
		height: 130,
		borderRadius: 65,
		justifyContent: "center",
		alignItems: "center",
	},
	trlLabel: {
		fontSize: 35,
		fontWeight: "bold",
		marginBottom: 26,
		textAlign: "center",
	},
	description: {
		textAlign: "center",
		fontSize: 14,
		marginBottom: 24,
		lineHeight: 20,
	},
	nextStep: {
		textAlign: "center",
		fontSize: 14,
		lineHeight: 20,
	},
	returnButton: {
		marginTop: 40,
		marginBottom: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
		width: "100%",
		paddingVertical: 15,
	},
	returnText: {
		fontSize: 18,
		fontWeight: "600",
	},
});
