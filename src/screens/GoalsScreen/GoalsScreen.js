import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function GoalsScreen(props) {
  const [loading, setLoading] = useState(true);
  const [userGoals, setUserGoals] = useState(null);
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
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
      if (userGoals) {
        setLoading(false);
      }
    }
  }, [userGoals]);

  console.log("goal screen!");
  return (
    <View style={styles.container}>
      <Text style={styles.smallText}>This month's goals</Text>
      {userGoalKeys.map((key) => {
        return (
          <Text
            id={key}
            style={{
              flex: 0.3,
              borderWidth: 5,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: "#AFB8DE",
            }}
          >
            {userGoals[key]}
          </Text>
        );
      })}
      {/* <Text style={styles.top}>Goal #1</Text>
      <Text style={styles.middle}>Goal #2</Text>
      <Text style={styles.bottom}>Goal #3</Text> */}
    </View>
  );
}
