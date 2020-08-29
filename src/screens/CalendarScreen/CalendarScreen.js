import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase, axios } from "../../firebase/config";
import { AppLoading } from "expo";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

export default function CalendarScreen(props) {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });
  const [loading, setLoading] = useState(true);
  const [userGoals, setUserGoals] = useState(null);
  const [goalColors, setGoalColors] = useState(null);
  const [userDates, setUserDates] = useState(null);
  const userGoalKeys = ["goal1", "goal2", "goal3"];
  const [appData, setAppData] = useState(null);

  // console.log("userGoals: ", userGoals);
  // console.log("goalColors: ", goalColors);
  // console.log("userDates: ", userDates);

  useEffect(() => {
    if (loading) {
      const fetchAppData = async () => {
        const data = await axios.get("appData");
        setAppData(data);
        console.log(appData);
      };
      // const fetchUserGoals = async () => {
      //   const data = await axios.get(`monthly_goals/${props.user.id}`);
      //   setUserGoals(data);
      //   console.log("userGoals: ", data);
      // };

      // const fetchGoalColors = async () => {
      //   const data = await axios.get("appData/goalColors");
      //   setGoalColors(data);
      //   console.log("goalColors: ", data);
      // };

      // const fetchUserDates = async () => {
      //   const data = await axios.get(`markedDates/${props.user.id}/dates`);
      //   setUserDates(data);
      //   console.log("userDates: ", data);
      // };

      // fetchUserGoals();
      // fetchGoalColors();
      // fetchUserDates();
      fetchAppData();
      console.log("should have run all fetch()'s");
    }
    if (userGoals && goalColors && userDates) {
      setLoading(false);
    }
  }, [userGoals, goalColors, userDates]);

  if (loading) {
    return <AppLoading />;
  } else {
    // console.log("userGoals: ", userGoals);
    // console.log("goalColors: ", goalColors);
    // console.log("userDates: ", userDates);
    return (
      <>
        <Text style={styles.title}>Happy{"\n"}Calendar</Text>
        <Calendar markingType={"period"} markedDates={userDates} />
        <View style={styles.container}>
          {userGoalKeys.map((goalKey) => {
            return (
              <View>
                <Text
                  style={{
                    fontFamily: "Montserrat_600SemiBold",
                    fontSize: 12,
                    color: goalColors[goalKey],
                  }}
                >
                  {userGoals[goalKey]}
                </Text>
              </View>
            );
          })}
        </View>
      </>
    );
  }
}
