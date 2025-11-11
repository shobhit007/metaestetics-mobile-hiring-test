import React from "react";
import { RegisterData } from "@types";
import { StyleSheet, View } from "react-native";
import { Button, DatePicker, Input, SelectInput } from "@components/common";
import { Formik } from "formik";
import { registerStep2ValidationSchema } from "@utils/validation";
import { PhoneInputComponent } from "@components/common/PhoneInput/PhoneInput";
import { GENDER_OPTIONS } from "@utils/constants";

export interface Step2PersonalInfoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

type Gender = "male" | "female" | "other";

// Placeholder component - candidates will implement this
export const Step2PersonalInfo: React.FC<Step2PersonalInfoProps> = ({
  formData,
  onDataChange,
  onNext,
  onPrevious,
}) => {
  const onHandleSubmit = (values: {
    countryCode: string;
    dateOfBirth: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    phoneNumber: string;
  }) => {
    onDataChange(values);
    onNext();
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          firstName: formData.firstName || "",
          lastName: formData.lastName || "",
          phoneNumber: formData.phoneNumber || "",
          dateOfBirth: formData.dateOfBirth || "",
          gender: (formData.gender as Gender) || "",
          countryCode: formData.countryCode || "",
        }}
        validationSchema={registerStep2ValidationSchema}
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
          <>
            <View style={styles.main}>
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
                value={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
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
                onPress={handleSubmit}
                variant="primary"
                size="large"
                style={{ flex: 1 }}
              />
            </View>
          </>
        )}
      </Formik>
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
});
