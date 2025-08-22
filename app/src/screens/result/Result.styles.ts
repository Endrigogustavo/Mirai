import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
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
