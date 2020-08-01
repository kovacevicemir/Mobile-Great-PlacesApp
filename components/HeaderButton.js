import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Platform } from "react-native";
import NewPlaceScreen from "../screens/NewPlaceScreen";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

NewPlaceScreen.navigationOptions = {
    headerTitle:'Add New Place'
}

export default CustomHeaderButton;

const styles = StyleSheet.create({});
