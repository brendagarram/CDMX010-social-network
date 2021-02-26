import { createUser, logInEmailPass } from './userFireBase.js';
import { infoValidationLogIn, infoValidationSignIn, emailPassVal } from './validation.js'
import { signOutConfirmation } from './modales.js'
import { showModals } from './showModals.js'
//  Autenticación con un proveedor
//  Github, Google, Facebook
export const logInProvider = (element, logInWithProvider) => {
  const logInBtnProvider = document.getElementById(element);
  logInBtnProvider.addEventListener('click', logInWithProvider);
}

//  Login correo y contraseña
export const logInData = () => {
 //  Mostrar contraseña
  const logInForm = document.forms.logInForm;
  const logInInputPassword = logInForm.logInPassword;
  const logInInputEmail = logInForm.logInButton;
  const btnLogIn = document.getElementById('logInButton');
  document.querySelector('.logInPassword_container span').addEventListener('click', e => {showPassword(e, logInInputPassword)});
 //  Validación de correo y contraseña al cambiar input
  emailPassVal(logInInputEmail, 'correo');
  emailPassVal(logInInputPassword, 'contraseña');
 //  Submit
  btnLogIn.addEventListener('click', () => {
    if (logInInputEmail.value != "" && logInInputPassword.value != ""){
      logInInputEmail.setCustomValidity("");
      logInEmailPass(logInInputEmail.value, logInInputPassword.value);
    } else {
      infoValidationLogIn(logInInputEmail, logInInputPassword);
    }
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
  console.log(signUpInputPassword);
  console.log(signUpInputPasswordConf);

 //  Mostrar contraseña
  document.querySelector('.signUpPassword-container span').addEventListener('click', e => {showPassword(e, signUpInputPassword)});
  document.querySelector('.signUpPasswordConfirm-container span').addEventListener('click', e => {showPassword(e, signUpInputPasswordConf)});
 //  Validación
  emailPassVal(signUpInName, 'nombre')
  emailPassVal(signUpInputEmail, 'correo');
  emailPassVal(signUpInputPassword, 'contraseña');
  emailPassVal(signUpInputPasswordConf, 'contraseña');
  btnSingUp.addEventListener('click', () => {
    if (signUpInputPassword.value != "" && signUpInputPasswordConf.value != "" && signUpInputEmail.value != "" && signUpInName.value != "") {
      if (signUpInputPassword.value === signUpInputPasswordConf.value) {
        createUser(signUpInputEmail.value, signUpInputPassword.value, signUpInName.value);
      } else {
        let errorMessageContainer = document.getElementById('error-message_container');
        let errorMessage = document.getElementById('error-message');
        errorMessageContainer.style.visibility = 'visible';
        errorMessage.textContent = 'Error al confirmar tu contraseña, intenta de nuevo';
        const showError = () => {
          setTimeout(function(){errorMessageContainer.style.visibility = 'hidden'}, 3000);
        }
        showError();
        }
    } else {
      infoValidationSignIn(signUpInName, signUpInputEmail, signUpInputPassword, signUpInputPasswordConf);
      }
    });
  };

 //  Mostrar contraseña
const showPassword = (e, element) => {
  if (e.target.classList.contains('passwordBtn-show')) {
    e.target.classList.remove('passwordBtn-show');
    e.target.classList.add('passwordBtn-hide');
    element.type = 'text';
  } else {
    console.log(e.target.classList);
    e.target.classList.remove('passwordBtn-hide');
    e.target.classList.add('passwordBtn-show');
    element.type = 'password';
  }
};

//  Salir de la app
export const signOut = () => {
  const signOutBtn = document.getElementsByClassName("signOut");
  console.log(signOutBtn);
  for (const button of signOutBtn) {
    console.log(button);
    button.addEventListener('click', () => {
      showModals(signOutConfirmation);
    })
  }
};
