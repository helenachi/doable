import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { AppLoading } from "expo";

export default function TodayScreen(props) {
  console.log(props.user);
  const [loading, setLoading] = useState(true);
  const [userGoals, setUserGoals] = useState(null);
  // const [goalTasks, setGoalTasks] = useState(null);
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
            // console.log("user goals set!");
            // console.log("Document data:", doc.data()[props.user.id]);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
      if (userGoals) {
        console.log("userGoals:", userGoals);
        setLoading(false);
      }
    }

    // const goalTasksRef = firebase
    //   .firestore()
    //   .collection("goals")
    //   .doc(userGoals[randomGoal]);
    // goalTasksRef.get().then(function (doc) {
    //   if (doc.exists) {
    //     console.log("Goals data:", doc.data());
    //   }
    // });
  }, [userGoals]);

  if (loading) {
    return <AppLoading />;
  } else {
    console.log("userGoals data:", userGoals);
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Today's{"\n"}Doable</Text>
        <Text style={styles.goalText}>{userGoals[randomGoal]}</Text>
        <Text style={styles.taskText}>
          Set up a time to catch up with your family and ask about their
          highlights and lowlights for the past week!
        </Text>
        <Button title="Start Time"></Button>
      </View>
    );
  }
}
