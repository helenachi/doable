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
  const TodayComponent = TodayScreen;
  const GoalComponent = () => {
    return <GoalsScreen {...props} />;
  };

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#4a59a8",
        }}
      >
        <Tab.Screen
          name="Today"
          component={TodayScreen}
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
          name="Goals"
          component={GoalComponent}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-star-outline" size={20} color="gray" />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
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
