import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function CalendarScreen(props) {
  const reading = "red";
  const relationships = "blue";
  const fitness = "pink";

  return (
    <>
      <Text>Calendar's Placeholder</Text>
      <Calendar
        markingType={"period"}
        markedDates={{
          "2020-07-20": { textColor: "green" },
          "2020-07-22": {
            // startingDay: true,
            color: "pink",
          },
          "2020-07-23": {
            selected: true,
            // endingDay: true,
            color: "green",
            // textColor: "gray",
          },
          "2020-07-04": {
            disabled: true,
            // startingDay: true,
            color: relationships,
            // endingDay: true,
          },
          "2020-06-22": { startingDay: true, color: "pink" },
        }}
      />
    </>
  );
}
