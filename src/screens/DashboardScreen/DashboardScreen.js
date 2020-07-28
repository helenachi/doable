import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { HomeScreen, TodayScreen } from "../index.js";

const Tab = createBottomTabNavigator();

export default function DashboardScreen(props) {
  // const user = props?.extraData?;

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Today" component={TodayScreen} />
        <Tab.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              logout={() => {
                setUser(null);
              }}
              extraData={props.extraData}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}
