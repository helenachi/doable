import "react-native-gesture-handler";
import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContent,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { DrawerItems } from "@react-navigation/native";
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
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const LogoutComponent = (props) => (
  <ScrollView>
    <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
      <DrawerItems {...props} />
      <Text>This is my logout Component</Text>
    </SafeAreaView>
  </ScrollView>
);

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

  const MyDrawerContent = (props) => {
    return (
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          justifyContent: "space-between",
          flexDirection: "column",
          flex: 1,
          marginBottom: 50,
        }}
      >
        <DrawerItemList {...props} />
        <DrawerItem
          label="Log out"
          onPress={() => {
            firebase
              .auth()
              .signOut()
              .then(() => {
                setUser(null);
              })
              .catch((error) => {
                alert(error);
              });
          }}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <NavigationContainer>
      {user ? (
        <>
          <Drawer.Navigator drawerContent={MyDrawerContent}>
            <Drawer.Screen name="Dashboard" component={MainComponent} />
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
  );
}
