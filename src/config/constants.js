import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCpZzF-n6aZc_esBTQMzpQEReD-KMOPsBk",
    authDomain: "yotearriendo-d532f.firebaseapp.com",
    databaseURL: "https://yotearriendo-d532f.firebaseio.com",
    projectId: "yotearriendo-d532f",
    storageBucket: "yotearriendo-d532f.appspot.com",
    messagingSenderId: "204194729368"
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;