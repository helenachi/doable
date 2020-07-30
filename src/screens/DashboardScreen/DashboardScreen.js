import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { GoalsScreen, TodayScreen, CalendarScreen } from "../index.js";

const Tab = createBottomTabNavigator();

export default function DashboardScreen(props) {
  // const user = props?.extraData?;
  console.log(props.extraData.id);

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Today" component={TodayScreen} />
        <Tab.Screen name="Goals" component={GoalsScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
      </Tab.Navigator>
    </>
  );
}