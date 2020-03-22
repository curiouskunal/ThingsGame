import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBF81gd28r3XYCVGaTrNuf9uQMmBzfeV-s",
  authDomain: "thingsv2-957e7.firebaseapp.com",
  databaseURL: "https://thingsv2-957e7.firebaseio.com",
  projectId: "thingsv2-957e7",
  storageBucket: "thingsv2-957e7.appspot.com",
  messagingSenderId: "611728713114",
  appId: "1:611728713114:web:98c6bb50fa3c3477528623",
  measurementId: "G-7M2Q1VJWW5"
};

Firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
