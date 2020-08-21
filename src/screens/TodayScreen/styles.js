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
    alignSelf: "center",
    margin: 20,
  },
  taskText: {
    fontSize: 21,
    color: "#000",
    fontFamily: "Montserrat_400Regular",
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 50,
  },
  goalBox: {
    // backgroundColor: "powderblue",
    // alignItems: "flex-start",
    flexDirection: "row",
  },
  taskBox: {
    // backgroundColor: "skyblue",
    alignSelf: "center",
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30,
    width: 250,
    height: 100,
  },
  completionBox: {
    width: 70,
    height: 85,
    alignSelf: "center",
    alignContent: "center",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    justifyContent: "space-between",
    // backgroundColor: "steelblue",
    marginTop: 40,
  },
  goalImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
});
