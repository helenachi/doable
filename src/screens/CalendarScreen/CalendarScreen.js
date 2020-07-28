import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function CalendarScreen(props) {
  return (
    <>
      <Text>Calendar's Placeholder</Text>
      <Calendar />
    </>
  );
}
