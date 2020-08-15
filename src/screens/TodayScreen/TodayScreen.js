import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { AppLoading } from "expo";
import CircleTimer from "react-native-circle-timer";

export default function TodayScreen(props) {
  const [loading, setLoading] = useState(true);
  const [userGoals, setUserGoals] = useState(null);
  const [goalTasks, setGoalTasks] = useState(null);

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
              } else {
                console.log("No such document!");
              }
            });
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
      if (userGoals && goalTasks) {
        setLoading(false);
      }
    }
  }, [userGoals, goalTasks]);

  const markTaskComplete = () => {
    let randomGoal = "goal" + props.user.randomGoal.toString();
    const doableToUpdate =
      "completedTasks" +
      "." +
      userGoals[randomGoal] +
      "." +
      goalTasks.randomTask;
    console.log("doableToUpdate:", doableToUpdate);
    const firebaseUser = firebase
      .firestore()
      .collection("users")
      .doc(props.user.id);
    firebaseUser.update({
      [`${doableToUpdate}`]: true,
    });
  };

  if (loading) {
    return <AppLoading />;
  } else {
    // console.log("userGoals data:", userGoals);
    // console.log("goalTasks: ", goalTasks);
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Today's{"\n"}Doable</Text>
        <Text style={styles.goalText}>{userGoals[randomGoal]}</Text>
        <Text style={styles.taskText}>
          {goalTasks.tasks[goalTasks.randomTask]}
        </Text>
        <Button onPress={markTaskComplete} title="Mark Complete"></Button>
      </View>
    );
  }
}
