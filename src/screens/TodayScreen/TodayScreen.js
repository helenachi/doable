import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function TodayScreen(props) {
  const [userGoals, setUserGoals] = useState(null);

  useEffect(() => {
    const goalsRef = firebase
      .firestore()
      .collection("monthly_goals")
      .doc(props.current);
    goalsRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setUserGoals(doc.data()[props.user.id]);
          console.log("Document data:", userGoals);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);

  const randomInt = Math.floor(Math.random() * 3) + 1;
  const displayGoal = "goal" + randomInt.toString();
  console.log(displayGoal);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Today's{"\n"}Doable</Text>
      <Text style={styles.goalText}>rando</Text>
      <Text style={styles.taskText}>
        Set up a time to catch up with your family and ask about their
        highlights and lowlights for the past week!
      </Text>
      <Button title="Start Time"></Button>
    </View>
  );
}
