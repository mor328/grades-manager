import firebase from "firebase/app";
import auth from "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyDm3FhlrYqCNMnFseonTVEGS1SxyQgkMOg",
  authDomain: "grades-manager-vue.firebaseapp.com",
  databaseURL:
    "https://grades-manager-vue-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "grades-manager-vue",
  storageBucket: "grades-manager-vue.appspot.com",
  messagingSenderId: "504953232745",
  appId: "1:504953232745:web:942b8c9e57c797966031f8",
});

export default {
  firebase,
};
