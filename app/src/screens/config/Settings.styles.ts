import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 24,
  },
  contentContainer: {
    paddingBottom: 100,
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
