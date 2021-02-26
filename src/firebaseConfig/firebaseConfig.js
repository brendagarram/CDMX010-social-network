var firebaseConfig = {
 apiKey: "AIzaSyAXxLTLdvZmiIP2XWk-_NfS02kGf8HtCYQ",
 authDomain: "socialnetwork-chopprueba.firebaseapp.com",
 projectId: "socialnetwork-chopprueba",
 storageBucket: "socialnetwork-chopprueba.appspot.com",
 messagingSenderId: "987065317933",
 appId: "1:987065317933:web:3cd47fcf238d56e94e96a4",
 measurementId: "G-WZRVTTQRW6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();
const firestore = firebase.firestore();