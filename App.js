import "react-native-gesture-handler";
import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  DashboardScreen,
} from "./src/screens";
import { Button, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "./src/firebase/config";
import { decode, encode } from "base-64";
import { set } from "react-native-reanimated";
import { ScreenStack } from "react-native-screens";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((puser) => {
      if (puser) {
        usersRef
          .doc(puser.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setUser(userData);
          })
          .catch((error) => {});
      }
    });
  }, []);

  const MainComponent = ({ navigation }) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="ios-settings" size={20} color="gray" />
              </TouchableOpacity>
            ),
          }}
        >
          {(props) => (
            <DashboardScreen
              {...props}
              logout={() => {
                setUser(null);
              }}
              extraData={user}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  };

  const LogoutComponent = () => {
    return (
      <TouchableOpacity>
        <Text>Logout</Text>
      </TouchableOpacity>
    );
  };

  return (
    <NavigationContainer>
      {user ? (
        <>
          <Drawer.Navigator>
            <Drawer.Screen name="Dashboard" component={MainComponent} />
            {/* <Drawer.Screen name="Logout" component={LogoutComponent} /> */}
            {/* <Drawer.Item
              label="Logout"
              onPress={() =>
                Alert.alert(
                  "Log out",
                  "Do you want to logout?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => {
                        console.log("logout cancelled");
                      },
                    },
                    {
                      text: "Confirm",
                      onPress: () => {
                        console.log("logout confirmed");
                      },
                    },
                  ],
                  { cancelable: false }
                )
              }
            /> */}
          </Drawer.Navigator>
        </>
      ) : (
        <>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     {user ? (
    //       <>
    //         <Stack.Screen
    //           name="Dashboard"
    //           options={{
    //             headerRight: () => (
    //               <TouchableOpacity
    //                 onPress={() => alert("settings button pressed")}
    //               >
    //                 <Ionicons name="ios-settings" size={20} color="gray" />
    //               </TouchableOpacity>
    //             ),
    //           }}
    //         >
    //           {(props) => (
    //             <DashboardScreen
    //               {...props}
    //               logout={() => {
    //                 setUser(null);
    //               }}
    //               extraData={user}
    //             />
    //           )}
    //         </Stack.Screen>
    //       </>
    //     ) : (
    //       <>
    //         <Stack.Screen name="Login" component={LoginScreen} />
    //         <Stack.Screen name="Registration" component={RegistrationScreen} />
    //       </>
    //     )}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
