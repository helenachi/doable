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
          // activeTintColor: "#ffffff",
          inactiveTintColor: "black",
          activeBackgroundColor: "#ffffff",
          showLabel: false,
          style: {
            backgroundColor: "#FEC169",
            height: 100,
          },
          tabStyle: {
            borderBottomStartRadius: 75,
            borderBottomEndRadius: 75,
          },
        }}
        initialRouteName="Today"
      >
        <Tab.Screen
          name="Goals"
          component={GoalComponent}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-star-outline" size={35} color="black" />
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
                size={35}
                color="black"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarComponent}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-calendar" size={35} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
