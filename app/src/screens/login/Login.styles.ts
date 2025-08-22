import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 34,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    borderRadius: 30,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 15,
  },
  button: {
    flex: 1,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPrimary: {},
  buttonSecondary: {
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPasswordButton: {
    alignSelf: "center",
    marginTop: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
});
