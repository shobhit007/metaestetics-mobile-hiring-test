import React from "react";
import { RegisterData } from "@types";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "@components/common";
import { Formik } from "formik";
import { registerStep1ValidationSchema } from "@utils/validation";

export interface Step1EmailPasswordProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
}

// Placeholder component - candidates will implement this
export const Step1EmailPassword: React.FC<Step1EmailPasswordProps> = ({
  formData,
  onDataChange,
  onNext,
}) => {
  const handleSubmit = (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    onDataChange(values);
    onNext();
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          email: formData.email || "",
          password: formData.password || "",
          confirmPassword: formData.confirmPassword || "",
        }}
        validationSchema={registerStep1ValidationSchema}
        onSubmit={handleSubmit}
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
                label="Email"
                placeholder="Enter email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => handleBlur("email")}
                error={touched.email && errors.email ? errors.email : undefined}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                label="Password"
                placeholder="Enter password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={() => handleBlur("password")}
                error={
                  touched.password && errors.password
                    ? errors.password
                    : undefined
                }
                secureTextEntry
              />
              <Input
                label="Confirm Password"
                placeholder="Confirm password"
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={() => handleBlur("confirmPassword")}
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : undefined
                }
                secureTextEntry
              />
            </View>
            <View>
              <Button
                title="Next"
                onPress={handleSubmit}
                variant="primary"
                size="large"
                fullWidth
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
});
