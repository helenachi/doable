import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { AppLoading } from "expo";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import * as Progress from 'react-native-progress';

export default function GoalsScreen(props) {
  let [fontsLoaded] = useFonts({ Montserrat_400Regular, Montserrat_600SemiBold });
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
        <Text style={styles.smallText}>My</Text>
        <Text style={styles.smallText}>Goals</Text>
        {userGoalKeys.map((goalKey) => {
          return (
            <View style={{width: 270, height: 200, flex: 0.3,
              borderWidth: 0.5,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: "#fff",
              fontFamily: "Montserrat_600SemiBold",
              fontSize: 18,
              borderRadius: 25,
              paddingLeft: 20,
              paddingTop: 15,}}>
            <Text
              key={goalKey}
              style={{
                fontFamily: "Montserrat_600SemiBold",
                fontSize: 22,
                paddingTop: 10,
                paddingBottom: 28,
              }}
            >
              {userGoals[goalKey]}
            </Text>
            <Progress.Bar progress={1.0} width={50} animated={false} color={goalColors[goalKey]}/>
            </View>
          
          );
        })}
        
      </View>
    );
  }
}
