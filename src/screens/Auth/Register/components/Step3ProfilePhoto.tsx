import React, { useState } from "react";
import { RegisterData } from "@types";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, ImagePickerComponent, Typography } from "@components/common";
import { Ionicons } from "@expo/vector-icons";

export interface Step3ProfilePhotoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Placeholder component - candidates will implement this
export const Step3ProfilePhoto: React.FC<Step3ProfilePhotoProps> = ({
  onDataChange,
  onNext,
  onPrevious,
  formData,
}) => {
  const [profileImage, setProfileImage] = useState<string>(
    formData.profileImage || ""
  );

  const handleImageSelection = (url: string) => {
    setProfileImage(url);
  };

  const onSubmit = () => {
    onDataChange({ profileImage: profileImage });
    onNext();
  };

  const onRemove = () => setProfileImage("");

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={{ alignItems: "center", padding: 4 }}>
          <Typography variant="h2">Upload profile image</Typography>
        </View>
        <View style={styles.imageSection}>
          <View style={{ position: "relative" }}>
            <ImagePickerComponent
              onImageSelected={handleImageSelection}
              currentImage={profileImage}
              size={150}
            />
            {profileImage && (
              <TouchableOpacity style={styles.closeButton} onPress={onRemove}>
                <Ionicons name="trash" size={20} color={"red"} />
              </TouchableOpacity>
            )}
          </View>
          {!profileImage && (
            <Typography variant="h4" style={{ marginTop: 8 }}>
              Select image
            </Typography>
          )}
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          title="Back"
          onPress={onPrevious}
          variant="outline"
          size="large"
          style={{ flex: 1 }}
        />
        <Button
          title="Next"
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
  main: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    gap: 4,
    paddingVertical: 16,
  },
  imageSection: { flex: 1, alignItems: "center", justifyContent: "center" },
  closeButton: {
    position: "absolute",
    right: 8,
    bottom: 8,
    zIndex: 1,
    width: 28,
    height: 28,
    borderRadius: 12,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
});
