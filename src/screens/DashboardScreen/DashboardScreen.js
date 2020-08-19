import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import {
  GoalsScreen,
  TodayScreen,
  CalendarScreen,
  HomeScreen,
} from "../index.js";

const Tab = createBottomTabNavigator();

export default function DashboardScreen(props) {
  // console.log(props.current);
  const TodayComponent = () => {
    return <TodayScreen {...props} user={props.user} current={props.current} />;
  };
  const GoalComponent = () => {
    return <GoalsScreen {...props} user={props.user} current={props.current} />;
  };
  const CalendarComponent = () => {
    return (
      <CalendarScreen {...props} user={props.user} current={props.current} />
    );
  };

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#4a59a8",
        }}
        initialRouteName="Today"
      >
        <Tab.Screen
          name="Goals"
          component={GoalComponent}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-star-outline" size={20} color="gray" />
            ),
          }}
        />
        <Tab.Screen
          name="Today"
          component={TodayComponent}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="ios-checkmark-circle-outline"
                size={20}
                color="gray"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarComponent}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-calendar" size={20} color="gray" />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
