import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 120,
    alignItems: "center",
  },
  title: {
    fontSize: 46,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
