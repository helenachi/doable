import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBz3EMq2_KYESsn25SAJccSEd_9SfxrCys",
  authDomain: "doable-f5fc4.firebaseapp.com",
  databaseURL: "https://doable-f5fc4.firebaseio.com",
  projectId: "doable-f5fc4",
  storageBucket: "doable-f5fc4.appspot.com",
  messagingSenderId: "547694184137",
  appId: "1:547694184137:ios:d79c2ddda09541f3772f18",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };