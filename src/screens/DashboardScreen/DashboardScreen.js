import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

export default function DashboardScreen(props) {
  return (
    <>
      <Text>Dashboard Screen Placeholder</Text>
    </>
  );
}
