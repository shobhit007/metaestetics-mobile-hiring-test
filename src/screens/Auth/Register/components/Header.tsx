import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Typography } from "@components/common";

interface HeaderProps {
  title: string;
  showBorder?: boolean;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <View style={[styles.header]}>
      <Typography variant="h2">{title}</Typography>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: 4,
    alignItems: "center",
  },
});
