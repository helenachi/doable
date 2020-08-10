import { StyleSheet } from "react-native";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat";

export default StyleSheet.create({
  titleText: {
    fontSize: 40,
    color: "#333333",
    fontFamily: "Montserrat_400Regular",
  },
  goalText: {
    fontSize: 15,
    color: "#333333",
  },
  taskText: {
    fontSize: 25,
    color: "#333333",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 30,
    margin: 20,
  },
});
