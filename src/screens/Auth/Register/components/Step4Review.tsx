import React from "react";
import { RegisterData } from "@types";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "./Header";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Button, Typography } from "@components/common";

export interface Step4ReviewProps {
  formData: RegisterData;
  onPrevious: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

// Placeholder component - candidates will implement this
export const Step4Review: React.FC<Step4ReviewProps> = ({
  formData,
  onPrevious,
  onSubmit,
  isLoading,
}: Step4ReviewProps) => {
  const ProfileField = ({ label, value }: { label: string; value: string }) => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldValue}>{value}</Text>
      </View>
    );
  };

  const transformedDate = new Date(formData.dateOfBirth).toLocaleDateString();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Review & Submit" />
      {/* Avatar Section */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarContainer}>
          {formData.profileImage ? (
            <Image
              source={{ uri: formData.profileImage }}
              style={styles.profileImage}
              contentFit="cover"
            />
          ) : (
            <View style={styles.avatar}>
              <Ionicons name="person" size={48} color={"#000"} />
            </View>
          )}
        </View>
        <Text style={styles.name}>
          {formData.firstName} {formData.lastName}
        </Text>
        <Text style={styles.email}>{formData.email}</Text>
      </View>

      {/* Profile Fields */}
      <View style={styles.fieldsContainer}>
        <ProfileField label="First Name" value={formData.firstName} />
        <ProfileField label="Last Name" value={formData.lastName} />
        <ProfileField label="Phone Number" value={formData.phoneNumber} />
        <ProfileField label="Date of Birth" value={transformedDate} />
        <ProfileField label="Gender" value={formData.gender} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          disabled={isLoading}
          title="Back"
          onPress={onPrevious}
          variant="outline"
          size="large"
          style={{ flex: 1 }}
        />
        <Button
          disabled={isLoading}
          title={`${isLoading ? "Submitting" : "Submit"}`}
          onPress={onSubmit}
          variant="primary"
          size="large"
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#fff",
  },
  avatarContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 80,
  },
  name: {
    fontSize: 28,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#999",
    marginBottom: 20,
  },
  confirmText: {
    fontSize: 15,
    color: "#999",
  },
  fieldsContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  fieldLabel: {
    fontSize: 16,
    color: "#999",
    flex: 1,
  },
  fieldValue: {
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 4,
    marginTop: 20,
  },
});
