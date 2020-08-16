import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { AppLoading } from "expo";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function TodayScreen(props) {
  const [loading, setLoading] = useState(true);
  const [userGoals, setUserGoals] = useState(null);
  const [goalTasks, setGoalTasks] = useState(null);
  /**
   * 0: not started
   * 1: in progress
   * 2: paused
   * 3: complete
   */
  const [completionStatus, setCompletionStatus] = useState(0);
  let randomGoal = "goal" + props.user.randomGoal.toString();

  useEffect(() => {
    if (loading) {
      const monthlyGoalsRef = firebase
        .firestore()
        .collection("monthly_goals")
        .doc(props.current);
      monthlyGoalsRef.get().then(function (doc) {
        if (doc.exists) {
          setUserGoals(doc.data()[props.user.id]);
          const goalTasksRef = firebase
            .firestore()
            .collection("goals")
            .doc(userGoals[randomGoal]);
          goalTasksRef.get().then(function (doc) {
            if (doc.exists) {
              setGoalTasks(doc.data());
            } else {
              console.log("No such document!");
            }
          });
        } else {
          console.log("No such document!");
        }
      });
      // .catch(function (error) {
      //   console.log("Error getting document:", error);
      // });
      if (userGoals && goalTasks) {
        setLoading(false);
      }
    }
  }, [userGoals, goalTasks]);

  const markTaskComplete = () => {
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

  const playButton = (
    <TouchableOpacity>
      <Ionicons name="ios-play-circle" size={20} color="gray" />
    </TouchableOpacity>
  );

  // const completionComponent = () => {
  //   return <AppLoading />;
  // };

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
        {playButton}
        {/* <Button onPress={markTaskComplete} title="Mark Complete"></Button>
        <View style={{ alignSelf: "center" }}>
          <AnimatedCircularProgress
            size={120}
            width={15}
            fill={100}
            rotation={0}
            tintColor="#00e0ff"
            onAnimationComplete={() => console.log("onAnimationComplete")}
            backgroundColor="#3d5875"
            duration={10000} // how fast it fills up in ms
          />
        </View> */}
      </View>
    );
  }
}
