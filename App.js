import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import { firebase } from './src/firebase/config'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // if (loading) {	
  //   return (	
  //     // <Text>loading...</Text>
  //     <></>	
  //   )	
  // }

  // useEffect(() => {
  //   const usersRef = firebase.firestore().collection('users');
  //   console.log("in useEffect")
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       usersRef
  //         .doc(user.uid)
  //         .get()
  //         .then((document) => {
  //           const userData = document.data()
  //           setLoading(false)
  //           setUser(userData)
  //         })
  //         .catch((error) => {
  //           setLoading(false)
  //         });
  //     } else {
  //       setLoading(false)
  //     }
  //   });
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? console.log(user.id) : console.log("you wished this worked bitch")}
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}