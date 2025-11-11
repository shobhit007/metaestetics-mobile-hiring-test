import { StyleSheet } from "react-native";
import { colors, spacing } from "@theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  imageSection: {
    paddingVertical: 20,
    alignItems: "center",
  },
  formContent: {
    flex: 1,
    padding: spacing.md,
  },
});
