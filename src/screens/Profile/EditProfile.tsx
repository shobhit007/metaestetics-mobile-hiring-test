import { useAppDispatch, useAppSelector } from "@store/hooks";
import { User } from "@types";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  ToastAndroid,
} from "react-native";
import { styles } from "./EditProfile.styles";
import { Formik } from "formik";
import { editProfileValidationSchema } from "@utils/validation";
import {
  Button,
  DatePicker,
  ImagePickerComponent,
  Input,
  SelectInput,
} from "@components/common";
import { PhoneInputComponent } from "@components/common/PhoneInput/PhoneInput";
import { GENDER_OPTIONS } from "@utils/constants";
import { mockApiService } from "@services";
import { setUser } from "@store/auth/authSlice";

// Placeholder component - candidates will implement this
export const EditProfile: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  if (!user) {
    return null;
  }

  const onHandleSubmit = async (values: User) => {
    try {
      setIsSubmitting(true);
      const response = await mockApiService.updateProfile(values.id, values);
      dispatch(setUser(response.user));
      ToastAndroid.showWithGravity(
        "Profile updated",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } catch (error) {
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Form */}
        <View style={styles.formContent}>
          <Formik
            initialValues={user}
            validationSchema={editProfileValidationSchema}
            onSubmit={onHandleSubmit}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                {/* Profile image */}
                <View style={styles.imageSection}>
                  <ImagePickerComponent
                    currentImage={values.profileImage}
                    onImageSelected={(uri) => handleChange("profileImage")(uri)}
                    size={120}
                  />
                </View>
                <Input
                  label="First Name"
                  placeholder="Enter first name"
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  onBlur={() => handleBlur("firstName")}
                  error={
                    touched.firstName && errors.firstName
                      ? errors.firstName
                      : undefined
                  }
                  keyboardType="default"
                />
                <Input
                  label="Last Name"
                  placeholder="Enter last name"
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                  onBlur={() => handleBlur("lastName")}
                  error={
                    touched.lastName && errors.lastName
                      ? errors.lastName
                      : undefined
                  }
                  keyboardType="default"
                />
                <PhoneInputComponent
                  label="Phone Number"
                  value={values.phoneNumber}
                  onChangeText={handleChange("phoneNumber")}
                  onChangeCountryCode={(code) => {
                    handleChange("countryCode")(code);
                  }}
                  countryCode={values.countryCode}
                  error={
                    touched.phoneNumber && errors.phoneNumber
                      ? errors.phoneNumber
                      : undefined
                  }
                />
                <DatePicker
                  label="Date of Birth"
                  value={
                    values.dateOfBirth ? new Date(values.dateOfBirth) : null
                  }
                  onChange={(date) => {
                    handleChange("dateOfBirth")(date.toISOString());
                  }}
                  error={
                    touched.dateOfBirth && errors.dateOfBirth
                      ? errors.dateOfBirth
                      : undefined
                  }
                />

                <SelectInput
                  label="Gender"
                  value={values.gender}
                  onChange={handleChange("gender")}
                  options={GENDER_OPTIONS}
                  error={
                    touched.gender && errors.gender ? errors.gender : undefined
                  }
                />

                <Button
                  disabled={isSubmitting}
                  title={isSubmitting ? "Updating..." : "Update"}
                  onPress={handleSubmit}
                  variant="primary"
                  size="large"
                  style={{ flex: 1 }}
                />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
