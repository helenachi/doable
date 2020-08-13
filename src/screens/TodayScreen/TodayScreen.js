import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { AppLoading } from "expo";

export default function TodayScreen(props) {
  const [loading, setLoading] = useState(true);
  const [userGoals, setUserGoals] = useState(null);
  const [goalTasks, setGoalTasks] = useState(null);
  let randomGoal = "goal" + props.user.randomGoal.toString();

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
            const goalTasksRef = firebase
              .firestore()
              .collection("goals")
              .doc(userGoals[randomGoal]);
            goalTasksRef.get().then(function (doc) {
              if (doc.exists) {
                console.log("goalTasks data exists!");
                setGoalTasks(doc.data());
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
      if (userGoals && goalTasks) {
        // console.log("userGoals:", userGoals);
        setLoading(false);
      }
    }
  }, [userGoals, goalTasks]);

  if (loading) {
    return <AppLoading />;
  } else {
    console.log("userGoals data:", userGoals);
    console.log("goalTasks: ", goalTasks);
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Today's{"\n"}Doable</Text>
        <Text style={styles.goalText}>{userGoals[randomGoal]}</Text>
        <Text style={styles.taskText}>
          {goalTasks.tasks[goalTasks.randomTask]}
        </Text>
        <Button title="Start Time"></Button>
      </View>
    );
  }
}
