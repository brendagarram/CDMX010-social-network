import { showModals } from "./showModals.js";
import { welcomeMsg, noVerification } from "./modales.js";

export const createUser = (email, password, name) => {
  let errorMessageContainer = document.getElementById('error-message_container');
  let errorMessage = document.getElementById('error-message');
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      //    Esto debe de actualizar el nombre del usuario, pero no se en dónde revisarlo en Firebase
      result.user.updateProfile({
          displayName: name
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
          errorMessage.textContent = error.message;
        });
    })
    .catch((error) => {
      //  Avisar al usuario en caso de que algo salga mal
      errorMessageContainer.style.visibility = 'visible';
      if (error.code === 'auth/email-already-in-use') {
        //  En este caso, avisa de que ya existe un usuario
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
        // console.log('Usuario logueado');
        window.location.hash = '#/';
        
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
        alert('Usuario no encontrado');
        errorMessageLogIn.textContent = 'Algo ha salido mal, tu usuario no ha sido encontrado. Verifica tu correo.';
        showError();
      }
      if (error.code === 'auth/wrong-password') {
        alert('¡Ups! Contraseña incorrecta. Revísala una vez más.');
        errorMessageLogIn.textContent = '¡Ups! Contraseña incorrecta. Revísala una vez más.';
        showError();
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
      window.location.hash = '#/';

})
    .catch((error) => {
    
    });
};

export const authFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      window.location.hash = '#/';
    })
    .catch((error) => {
    });
};

export const signOutFire = () => {
  console.log('me voy');
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase.auth().signOut()
      .then((result) => {
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


