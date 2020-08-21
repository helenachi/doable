import { StyleSheet } from "react-native";

export default StyleSheet.create({
  titleText: {
    fontSize: 54,
    color: "#000000",
    fontFamily: "Montserrat_600SemiBold",
  },
  goalText: {
    fontSize: 20,
    color: "#333333",
    fontFamily: "Montserrat_600SemiBold",
  },
  taskText: {
    fontSize: 21,
    color: "#333333",
    fontFamily: "Montserrat_400Regular",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 50,
  },
  goalBox: {
    width: 50,
    height: 50,
    backgroundColor: "powderblue",
  },
  taskBox: {
    width: 50,
    height: 50,
    backgroundColor: "skyblue",
  },
  completionBox: {
    width: 50,
    height: 50,
    backgroundColor: "steelblue",
  },
});
