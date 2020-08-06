import { StyleSheet } from "react-native";

const goal1 = "#f3c5dc";
const goal2 = "#f7d1b6";
const goal3 = "#f4e8b2";

export default StyleSheet.create({
  circle1: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    backgroundColor: goal1,
  },
  circle2: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    backgroundColor: goal2,
  },
  circle3: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    backgroundColor: goal3,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 30,
    margin: 20,
  },
});
