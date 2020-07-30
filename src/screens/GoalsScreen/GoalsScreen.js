import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function GoalsScreen(props) {
  const onLogoutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        props.logout();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.smallText}>This month's goals</Text>
      <TouchableOpacity style={styles.button} onPress={onLogoutPress}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
      <Text style={styles.top}>Goal #1</Text>
      <Text style={styles.middle}>Goal #1</Text>
      <Text style={styles.bottom}>Goal #1</Text>
    </View>
  );
}
