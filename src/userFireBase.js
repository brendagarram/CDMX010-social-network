import { showModals } from "./showModals.js";
import { welcomeMsg, noVerification } from "./modales.js";

export const createUser = (email, password,name) => {
  //    console.log('Vamos a crear un usuario')
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log('Revisar usuario en Firebase');
      //    Esto debe de actualizar el nombre del usuario, pero no se en dónde revisarlo en Firebase
      result.user.updateProfile({
          displayName: name
     }).then (function () {
       console.log('Hola, ' + name);
       console.log(result.user.displayName);
       console.log(result);
     })

      // url para redireccionar a nuestra página
      const config = {
        url: 'http://localhost:5000/',
      };
        //  enviar un mensaje de verificación al usuario y redireccionarlo a nuestra página
      result.user.sendEmailVerification(config)
        .then((result) => {
          showModals(welcomeMsg);
        })
        .catch((error) => {
        });
    })
    .catch((error) => {
      //  Esto es para crear mensaje de error para avisar al usuario en caso de que algo salga mal
      //  En este caso, avisa de que ya existe un usuario
      if (error.code === 'auth/email-already-in-use') {
        document.getElementById('error--message--signUp').style.display = 'block';
      } else {
        console.log(error);
        console.log(error.message);
      }
    });
};

export const logInEmailPass = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
      //  evaluar si validó su correo
      if (result.user.emailVerified) {
        // console.log('Usuario logueado');
        window.location.hash = '#/';
        console.log(result.user);
      } else {
        showModals(noVerification);
        //  para que no esté logueado aunque los datos sean correctos
        firebase.auth().signOut();
      }
    })
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        alert('Usuario no encontrado');
        document.getElementById('error--message').style.display = 'block';
      }
    });
};

export const authGitHub = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log('usuario logueado con Github');
      window.location.hash = '#/';
    })
    .catch((error) => {
      console.log(error);
    });
};

export const authGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const credential = result.credential;
      const user = result.user;
      const accessToken = credential.accessToken;
      // console.log(credential, user, accessToken);
      window.location.hash = '#/';
})
    .catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.log(errorCode, errorMessage, email, credential)
    });
};

export const authFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
    /* @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;
      // The signed-in user info.
      const user = result.user;
      const name = result.displayName;
      console.log(name);
      console.log(user);
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const accessToken = credential.accessToken;
      console.log(accessToken);
      console.log(result);
      window.location.hash = '#/';
    })
    .catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      // console.log(errorCode);
      const errorMessage = error.message;
      // console.log(errorMessage);
      // The email of the user's account used.
      const email = error.email;
      // console.log(email);
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // console.log(credential);
    });
};

export const signOutFire = () => {
  console.log('me voy');
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      firebase.auth().signOut()
      .then((result) => {
      console.log(result);
      console.log('estás fuera');
      // window.location.href = 'http://127.0.0.1:5501/src/index.html';
      location.replace('http://localhost:5000')
    })
      .catch((error) => {
      console.log(error);
    })
    } else {
      // alert('Vuelve a iniciar sesión');
    }
  });
};


