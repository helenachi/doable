import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { AppLoading } from "expo";

export default function CalendarScreen(props) {
  const [loading, setLoading] = useState(true);
  const [userGoals, setUserGoals] = useState(null);
  const [goalColors, setGoalColors] = useState(null);
  const [userDates, setUserDates] = useState(null);
  const userGoalKeys = ["goal1", "goal2", "goal3"];

  useEffect(() => {
    if (loading) {
      const monthlyGoalsRef = firebase
        .firestore()
        .collection("monthly_goals")
        .doc(props.current);
      monthlyGoalsRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setUserGoals(doc.data()[props.user.id]);
            const goalColorsRef = firebase
              .firestore()
              .collection("appData")
              .doc("goalColors");
            goalColorsRef.get().then(function (doc) {
              if (doc.exists) {
                setGoalColors(doc.data());

                const markedDatesRef = firebase
                  .firestore()
                  .collection("markedDates")
                  .doc(props.user.id);
                markedDatesRef.get().then(function (doc) {
                  if (doc.exists) {
                    setUserDates(doc.data()["dates"]);
                    // console.log("userdates:", userDates);
                  }
                });
              }
            });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
      if (userGoals && goalColors && userDates) {
        setLoading(false);
      }
    }
  }, [userGoals, goalColors, userDates]);

  if (loading) {
    return <AppLoading />;
  } else {
    return (
      <>
        {/* <Text>Calendar's Placeholder</Text> */}
        <Calendar
          markingType={"period"}
          // 1: #EA6648, 2: #FFA18C, 3: #F7D1B6
          markedDates={userDates}
        />
        <View style={styles.container}>
          {userGoalKeys.map((goalKey) => {
            return (
              <View
                key={goalKey}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 44 / 2,
                  backgroundColor: goalColors[goalKey],
                }}
              >
                <Text>{userGoals[goalKey]}</Text>
              </View>
            );
          })}
          {/* <View style={styles.circle1}></View>
          <View style={styles.circle2}></View>
          <View style={styles.circle3}></View> */}
        </View>
      </>
    );
  }
}
