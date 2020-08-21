import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    //background: url("../../../assets/goals_block.png"),
    padding: 50,
  },
  smallText: {
    fontSize: 40,
    color: "#333333",
    fontFamily: "Montserrat_600SemiBold",
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
});
