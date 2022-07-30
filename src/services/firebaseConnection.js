import firebase from "firebase/app";
import 'firebase/database'

let firebaseConfig = {
    apiKey: "AIzaSyB4yuPtpTTT2taLOlNqMKHMfH8A-ccTKNA",
    authDomain: "uaigraosteste.firebaseapp.com",
    projectId: "uaigraosteste",
    storageBucket: "uaigraosteste.appspot.com",
    messagingSenderId: "203508172705",
    appId: "1:203508172705:web:87a572a2444d6c6e18ede0",
    measurementId: "G-MF9G5CD6GY"
  };

  //init firebase
  if(!firebase.apps.length){
    //Abrir conexão
      firebase.initializeApp(firebaseConfig);
  }
  export default firebase;