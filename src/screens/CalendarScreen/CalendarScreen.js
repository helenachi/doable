import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function CalendarScreen(props) {
  const goal1 = "#f3c5dc";
  const goal2 = "#f7d1b6";
  const goal3 = "#f4e8b2";

  return (
    <>
      {/* <Text>Calendar's Placeholder</Text> */}
      <Calendar
        markingType={"period"}
        markedDates={{
          "2020-07-20": { color: goal1 },
          "2020-07-22": { color: goal2 },
          "2020-07-23": { color: goal3 },
          "2020-07-04": { color: goal3 },
          "2020-06-22": { color: goal1 },
        }}
      />
      <View style={styles.container}>
        <View style={styles.circle1}></View>
        <View style={styles.circle2}></View>
        <View style={styles.circle3}></View>
      </View>
    </>
  );
}
