import {
  createUser, logInEmailPass, upDateUser, emailVerification,
  emailVerified, signOutFire, postData, currentUserConf,
} from './userFireBase.js';
import { showError } from './others.js';
import { welcomeMsg, noVerification } from './modales.js';
import { infoValidation } from './validation.js';
import { showModals } from './showModals.js';


export const signInResponse = (signUpInputPassword, signUpInputPasswordConf,
  signUpInputEmail, signUpInName) => {
  const errorMessageContainer = document.getElementById('error-message_container');
  const errorMessage = document.getElementById('error-message');
  if (signUpInputPassword.value !== '' && signUpInputPasswordConf.value !== '' && signUpInputEmail.value !== '' && signUpInName.value !== '') {
    if (signUpInputPassword.value === signUpInputPasswordConf.value) {
      const resultCreateUser = createUser(signUpInputEmail.value, signUpInputPassword.value);
      resultCreateUser.then(() => {
        const update = upDateUser(resultCreateUser.i.user, {
          name: signUpInName.value,
          email: signUpInputEmail.value,
        });
        update.then(() => {
          console.log('Nuevo nombre');
        }).catch(() => {
          console.log('No se actualizó');
        });
      }).catch((error) => {
        errorMessageContainer.style.visibility = 'visible';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage.textContent = 'Oh, oh, este correo ya existe, intenta con otro';
        } else if (error.code === 'auth/weak-password') {
          errorMessage.textContent = 'Tu contraseña debe contener al menos 6 caracteres';
        } else {
          errorMessage.textContent = error.message;
        }
        showError(errorMessageContainer);
      });
      resultCreateUser.then(() => {
        //  Verificación por email
        const emailVer = emailVerification(resultCreateUser.i.user);
        emailVer.then(() => {
          showModals(welcomeMsg);
          const user = currentUserConf();
          postData(user.uid, []).then(() => {
            console.log('listo');
          }).catch((error) => {
            console.log(error);
          });
        }).catch((error) => {
          console.log(error);
          errorMessage.textContent = error.message;
        });
      });
    } else {
      errorMessageContainer.style.visibility = 'visible';
      errorMessage.textContent = 'Error al confirmar tu contraseña, intenta de nuevo';
      showError(errorMessageContainer);
    }
  } else {
    infoValidation({
      emailInput: signUpInputEmail,
      passwordInput: signUpInputPassword,
      passwordConf: signUpInputPasswordConf,
      nameInput: signUpInName,
    });
  }
};

export const logInResponse = (logInInputEmail, logInInputPassword) => {
  const errorMessageContainerLogIn = document.getElementById('error-messageLogIn_container');
  const errorMessageLogIn = document.getElementById('error-messageLogIn');
  if (logInInputEmail.value !== '' && logInInputPassword.value !== '') {
    logInInputEmail.setCustomValidity('');
    logInEmailPass(logInInputEmail.value, logInInputPassword.value)
      .then((result) => {
        // Confirmar validación por correo
        const validationConf = emailVerified(result.user);
        if (validationConf) {
          window.location.hash = '#/';
        } else {
          showModals(noVerification);
          signOutFire();
        }
      }).catch((error) => {
        errorMessageContainerLogIn.style.visibility = 'visible';
        const showErrorTime = () => {
          setTimeout(() => { errorMessageContainerLogIn.style.visibility = 'hidden'; }, 3000);
        };
        if (error.code === 'auth/user-not-found') {
          errorMessageLogIn.textContent = 'Algo ha salido mal, tu usuario no ha sido encontrado. Verifica tu correo.';
          showErrorTime();
        }
        if (error.code === 'auth/wrong-password') {
          errorMessageLogIn.textContent = '¡Ups! Contraseña incorrecta. Revísala una vez más.';
          showErrorTime();
        }
      });
  } else {
    infoValidation({
      emailInput: logInInputEmail,
      passwordInput: logInInputPassword,
    });
  }
};
