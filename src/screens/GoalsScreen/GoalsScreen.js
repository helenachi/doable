import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { AppLoading } from "expo";

export default function GoalsScreen(props) {
  const [loading, setLoading] = useState(true);
  const [userGoals, setUserGoals] = useState(null);
  const [goalColors, setGoalColors] = useState(null);
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
                console.log("goalColors:", goalColors);
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
      if (userGoals && goalColors) {
        setLoading(false);
      }
    }
  }, [userGoals, goalColors]);

  if (loading) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.smallText}>This month's goals</Text>
        {userGoalKeys.map((goalKey) => {
          return (
            <Text
              key={goalKey}
              style={{
                flex: 0.3,
                borderWidth: 5,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: goalColors[goalKey],
              }}
            >
              {userGoals[goalKey]}
            </Text>
          );
        })}
      </View>
    );
  }
}
