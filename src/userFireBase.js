import { router } from './main.js';
import { showModals } from "./showModals.js";
import { welcomeMsg, noVerification } from "./modales.js";

export const createUser = (email, password, name) => {
  let errorMessageContainer = document.getElementById('error-message_container');
  let errorMessage = document.getElementById('error-message');
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      //    Esto actualiza el nombre del usuario
      result.user.updateProfile({
          displayName: name
      })
      // url para redireccionar a nuestra página
      const config = {
        url: 'http://localhost:5000/',
      };
        //  enviar un mensaje de verificación al usuario y redireccionarlo a nuestra página
      result.user.sendEmailVerification(config)
        .then(() => {
          showModals(welcomeMsg);
        })
        .catch((error) => {
          console.log(error);
          errorMessage.textContent = error.message;
        });
    })
    .catch((error) => {
      errorMessageContainer.style.visibility = 'visible';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage.textContent = 'Oh, oh, este correo ya existe, intenta con otro'
      } else if (error.code === 'auth/weak-password') {
        errorMessage.textContent = 'Tu contraseña debe contener al menos 6 caracteres'
      } else {
        errorMessage.textContent = error.message;
      }
    });
};

export const logInEmailPass = (email, password) => {
  let errorMessageContainerLogIn = document.getElementById('error-messageLogIn_container');
  let errorMessageLogIn = document.getElementById('error-messageLogIn');
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
      //  evaluar si validó su correo
      if (result.user.emailVerified) {
        //  comprobar que está logueado antes de ir al home
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
          window.location.hash = '#/';
          console.log('usuario logueado');
          }
        })
      } else {
        showModals(noVerification);
        //  para que no esté logueado aunque los datos sean correctos
        firebase.auth().signOut();
      }
    })
    .catch((error) => {
      console.log(error);
      errorMessageContainerLogIn.style.visibility = 'visible';
      const showError = () => {
        setTimeout(function(){errorMessageContainerLogIn.style.visibility = 'hidden'}, 3000);
      }
      if (error.code === 'auth/user-not-found') {
        errorMessageLogIn.textContent = 'Algo ha salido mal, tu usuario no ha sido encontrado. Verifica tu correo.';
        showError();
      }
      if (error.code === 'auth/wrong-password') {
        errorMessageLogIn.textContent = '¡Ups! Contraseña incorrecta. Revísala una vez más.';
        showError();
        }
    });
};


export const authGitHub = () => {
  let errorMessageContainerLogIn = document.getElementById('error-messageLogIn_container');
  let errorMessageLogIn = document.getElementById('error-messageLogIn');
  const provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      window.location.hash = '#/';
    }).catch((error) => {
      errorMessageContainerLogIn.style.visibility = 'visible';
      kindOfError(error, errorMessageLogIn);
    });
};

export const authGoogle = () => {
  let errorMessageContainerLogIn = document.getElementById('error-messageLogIn_container');
  let errorMessageLogIn = document.getElementById('error-messageLogIn');
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      let user = firebase.auth().currentUser;
      window.location.hash = '#/';
      console.log(user);
  }).catch((error) => {
    console.log(error);
      errorMessageContainerLogIn.style.visibility = 'visible';
      kindOfError(error, errorMessageLogIn);
    });
};

export const authFacebook = () => {
  let errorMessageContainerLogIn = document.getElementById('error-messageLogIn_container');
  let errorMessageLogIn = document.getElementById('error-messageLogIn');
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      window.location.hash = '#/';
    }).catch((error) => {
      errorMessageContainerLogIn.style.visibility = 'visible';
      kindOfError(error, errorMessageLogIn);
    });
};

const kindOfError = (error, containerError) => {
  if (error.code === 'auth/account-exists-with-different-credential') {
    containerError.textContent = 'Algo ha salido mal, parece que has registrado este correo antes';
  }
};

export const signOutFire = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase.auth().signOut()
      .then(() => {
      window.location.replace('http://localhost:5000');
    })
      .catch((error) => {
      console.log(error);
    })
    } else {
      // alert('Vuelve a iniciar sesión');
    }
  });
};


