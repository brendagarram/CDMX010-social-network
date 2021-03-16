import { emailPassVal } from './validation.js';
import { signInResponse, logInResponse } from './register.js';
import { signOutConfirmation } from './modales.js';
import { showModals } from './showModals.js';
import { showPassword } from './others.js';

//  Autenticación con un proveedor
//  Github, Google, Facebook
export const logInProvider = (element, logInWithProvider) => {
  const errorMessageContainerLogIn = document.getElementById('error-messageLogIn_container');
  const errorMessageLogIn = document.getElementById('error-messageLogIn');
  const logInBtnProvider = document.getElementById(element);
  logInBtnProvider.addEventListener('click', () => {
    logInWithProvider()
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            window.location.hash = '#/';
          }
        });
      })
      .catch((error) => {
        errorMessageContainerLogIn.style.visibility = 'visible';
        if (error.code === 'auth/account-exists-with-different-credential') {
          errorMessageLogIn.textContent = 'Algo ha salido mal, parece que has registrado este correo antes';
        }
      });
  });
};

//  Login correo y contraseña
export const logInData = () => {
  const logInForm = document.forms.logInForm;
  const logInInputPassword = logInForm.logInPassword;
  const logInInputEmail = logInForm.logInEmail;
  console.log(logInInputEmail);
  const btnLogIn = document.getElementById('logInButton');
  document.querySelector('.logInPassword_container span').addEventListener('click', (e) => { showPassword(e, logInInputPassword); });
  //  Validación de correo y contraseña al cambiar input
  emailPassVal(logInInputEmail, 'correo');
  emailPassVal(logInInputPassword, 'contraseña');
  //  Submit
  btnLogIn.addEventListener('click', () => {
    logInResponse(logInInputEmail, logInInputPassword);
  });
};

// Creación de cuenta
export const signUpData = () => {
  const formSignUp = document.forms.signUpForm;
  const signUpInputEmail = formSignUp.signUpEmail;
  const signUpInputPassword = formSignUp.signUpPassword;
  const signUpInputPasswordConf = formSignUp.signUpPasswordConfirm;
  const signUpInName = formSignUp.signUpName;
  const btnSingUp = document.getElementById('signUpButton');
  //  Mostrar contraseña
  document.querySelector('.signUpPassword-container span').addEventListener('click', (e) => { showPassword(e, signUpInputPassword); });
  document.querySelector('.signUpPasswordConfirm-container span').addEventListener('click', (e) => { showPassword(e, signUpInputPasswordConf); });
  //  Validación en el evento input
  emailPassVal(signUpInName, 'nombre');
  emailPassVal(signUpInputEmail, 'correo');
  emailPassVal(signUpInputPassword, 'contraseña');
  emailPassVal(signUpInputPasswordConf, 'contraseña');
  //  Submit
  btnSingUp.addEventListener('click', () => {
    signInResponse(signUpInputPassword, signUpInputPasswordConf, signUpInputEmail, signUpInName);
  });
};

//  Salir de la app
export const signOut = () => {
  const signOutBtn = document.getElementsByClassName('signOut');
  for (const button of signOutBtn) {
    button.addEventListener('click', () => {
      showModals(signOutConfirmation);
    });
  }
};
