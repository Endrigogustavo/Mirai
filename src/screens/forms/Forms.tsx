import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../../routes/Routes";
import { useTheme } from "../../context/ThemeContext";

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

export const Forms: React.FC = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { theme, toggleTheme } = useTheme();

	const [currentStep, setCurrentStep] = useState(0);
	const [answers, setAnswers] = useState<(number | null)[]>(
		Array(steps.length).fill(null)
	);

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep((prev) => prev + 1);
		} else {
			navigation.navigate("Result", { answers });
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
			{/* Botão alternar tema */}
			<TouchableOpacity
				style={{ position: "absolute", top: 20, right: 20 }}
				onPress={toggleTheme}
			></TouchableOpacity>

			{/* Botão voltar para Home */}
			<TouchableOpacity
				style={[styles.backButton, { backgroundColor: theme }]}
				onPress={() => navigation.navigate("Home")}
			>
				<Icon name="arrow-back" size={24} color={theme.icon} />
			</TouchableOpacity>

			<View style={styles.iconContainer}>
				<View style={[styles.glow, { backgroundColor: theme }]}>
					<Icon name="document-text-outline" size={150} color="#3b9eff" />
				</View>
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
									selected === num ? theme.buttonText : theme.circle,
							},
						]}
					>
						<Text
							style={[
								styles.number,
								{
									color:
										selected === num
											? theme.buttonBackground
											: theme.background,
								},
							]}
						>
							{num}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			{/* Botões Voltar e Próximo */}
			<View style={styles.navigationButtons}>
				{currentStep > 0 && (
					<TouchableOpacity
						style={[
							styles.backStepButton,
							{ backgroundColor: theme, borderRadius: 8, padding: 10 },
						]}
						onPress={handleBack}
					>
						<Icon name="chevron-back-outline" size={24} color={theme.text} />
						<Text style={[styles.returnText, { color: theme.text }]}>
							Voltar
						</Text>
					</TouchableOpacity>
				)}

				<TouchableOpacity
					style={[
						styles.nextStepButton,
						{
							backgroundColor: selected === null ? theme : theme,
							borderRadius: 8,
							padding: 10,
						},
					]}
					onPress={handleNext}
					disabled={selected === null}
				>
					<Text style={[styles.returnText, { color: theme.text }]}>
						{currentStep === steps.length - 1 ? "Finalizar" : "Próximo"}
					</Text>
					<Icon name="chevron-forward-outline" size={24} color={theme.text} />
				</TouchableOpacity>
			</View>
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
	navigationButtons: {
		marginTop: 50,
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 20,
	},
	backStepButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		paddingHorizontal: 15,
	},
	nextStepButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		paddingHorizontal: 15,
	},
	returnText: {
		fontSize: 18,
	},
});
