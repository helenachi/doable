import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Easing,
} from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { AppLoading } from "expo";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import moment from "moment";

export default function TodayScreen(props) {
  const [loading, setLoading] = useState(true);
  const [userGoals, setUserGoals] = useState(null);
  const [goalTasks, setGoalTasks] = useState(null);
  let randomGoal = "goal" + props.user.randomGoal.toString();

  /**
   * 0: not started
   * 1: in progress
   * 2: paused
   * 3: complete
   */
  const [completionStatus, setCompletionStatus] = useState(0);
  const [completionComponent, setCompletionComponent] = useState(null);

  const [doableFill, setDoableFill] = useState(0);
  const doableMaxDuration = 20000;

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

  useEffect(() => {
    // console.log("user.completed: ", props.user.completed);
    // console.log("completionStatus: ", completionStatus);
    if (props.user.completed) {
      setCompletionStatus(3);
      setCompletionComponent(completed);
    } else {
      if (completionStatus === 0) {
        setCompletionComponent(playButton);
      } else if (completionStatus === 1) {
        setCompletionComponent(circularProgress);
      } else if (completionStatus === 2) {
        setCompletionComponent(onPause);
      } else if (completionStatus === 3) {
        setCompletionComponent(completed);
      } else {
        setCompletionComponent(<View></View>);
      }
    }
  }, [completionStatus]);

  const markTaskComplete = () => {
    setCompletionStatus(3);
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
      completed: true,
    });
    props.user.completed = true;
  };

  const playButton = (
    <TouchableOpacity
      onPress={() => {
        setCompletionStatus(1);
      }}
    >
      <Ionicons name="ios-play-circle" size={20} color="gray" />
    </TouchableOpacity>
  );

  const circularProgress = (
    <View style={{ alignSelf: "center" }}>
      <TouchableOpacity
        onPress={() => {
          setCompletionStatus(2);
        }}
      >
        <AnimatedCircularProgress
          size={120}
          width={15}
          fill={100}
          rotation={0}
          tintColor="#00e0ff"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#3d5875"
          easing={Easing.linear}
          duration={doableMaxDuration} // how fast it fills up in milliseconds
        >
          {(fill) => <Text style={styles.points}>{fillToTime(fill)}</Text>}
        </AnimatedCircularProgress>
      </TouchableOpacity>
    </View>
  );

  const fillToTime = (fill) => {
    let numSeconds = Math.round((fill / 100) * doableMaxDuration);
    return new Date(numSeconds).toISOString().substr(11, 8);
  };

  const onPause = (
    <View>
      <Button
        onPress={() => setCompletionStatus(1)}
        title="Resume Doable"
      ></Button>
      <Button onPress={markTaskComplete} title="Mark Complete"></Button>
    </View>
  );

  const completeButton = (
    <Button onPress={markTaskComplete} title="Mark Complete"></Button>
  );

  const completed = (
    <Text>
      Congratulations on doing your doable! See you tomorrow for a new one :)
    </Text>
  );

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
        {completionComponent}
      </View>
    );
  }
}
