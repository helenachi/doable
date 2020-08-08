import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function TodayScreen(props) {
  console.log("TodayScreen User prop: ");
  console.log(props.user);

  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const goalsref = firebase.firestore().collection("users");
  //   firebase.auth().onAuthStateChanged((puser) => {
  //     if (puser) {
  //       usersRef
  //         .doc(puser.uid)
  //         .get()
  //         .then((document) => {
  //           const userData = document.data();
  //           setUser(userData);
  //         })
  //         .catch((error) => {});
  //     }
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Today's{"\n"}Doable</Text>
      <Text style={styles.goalText}>Relationships</Text>
      <Text style={styles.taskText}>
        Set up a time to catch up with your family and ask about their
        highlights and lowlights for the past week!
      </Text>
      <Button title="Start Time"></Button>
    </View>
  );
}
