import 'react-native-gesture-handler';
import React, { useEffect, useState, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import { firebase } from './src/firebase/config'
import {decode, encode} from 'base-64'
import { set } from 'react-native-reanimated';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [shouldSignOut, setShouldSignOut] = useState(false)

  useEffect(() => {
    if (!shouldSignOut) {
      const usersRef = firebase.firestore().collection('users');
      firebase.auth().onAuthStateChanged((puser) => {
        if (puser) {
          // console.log(user.uid)
          usersRef
            .doc(puser.uid)
            .get()
            .then((document) => {
              const userData = document.data()
              // setLoading(false)
              setUser(userData)
              // setIsSignedOut(false)
            })
            .catch((error) => {
              // setLoading(false)
            });
            // console.log("user has been updated...")
        } else {
          console.log("no user")
          console.log(puser)
          console.log(user)
          // setLoading(false)
        }
      })
    } else {
      setShouldSignOut(false)
      console.log("shoudsignout is set to false now")
    }
    setLoading(false)
  }, [user]);

  useEffect(() => {
    if (shouldSignOut) {
      console.log("shouldsignout is true")
      setUser(null)
    }
  }, [shouldSignOut])


  // if (loading) {
  //   return (
  //     <></>
  //   )
  // } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          { user ? (
            <>
              <Stack.Screen name="Home">
                {props => <HomeScreen {...props} logout={() => {setShouldSignOut(true)}} extraData={user} />}
              </Stack.Screen>
              {/* <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} /> */}
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
              {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  // }
}