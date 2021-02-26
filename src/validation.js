//  Validación de correo logIn
export const infoValidationLogIn = (emailInput, passwordInput, nameInput) => {
  console.log('Hola');
  console.log(nameInput);
  if (emailInput.validity.typeMismatch) {
    emailInput.setCustomValidity("¡Hey, espera! Este no es un correo válido, intenta de nuevo agregando un @");
  } else if (emailInput.value === "") {
    emailInput.setCustomValidity('¡Espera! No olvides colocar tu correo');
  } else if (passwordInput.value === "") {
    passwordInput.setCustomValidity('¡Espera! No olvides colocar tu contraseña');
  } else if (nameInput.value === "") {
    nameInput.setCustomValidity('¡Espera! No olvides colocar tu nombre');
  }
  else {
    emailInput.setCustomValidity("");
    passwordInput.setCustomValidity("");
    nameInput.setCustomValidity("");
  }
};

//  Validación correo SignIn
export const infoValidationSignIn = (nameInput, emailInput, passwordInput, passwordConf) => {
  if (emailInput.validity.typeMismatch) {
    emailInput.setCustomValidity("¡Hey, espera! Este no es un correo válido, intenta de nuevo agregando un @");
  } else if (emailInput.value === "") {
    emailInput.setCustomValidity('¡Espera! No olvides colocar tu correo');
  } else if (passwordInput.value === "") {
    passwordInput.setCustomValidity('¡Espera! Tu contraseña es importante');
  } else if (passwordConf.value === "") {
    passwordConf.setCustomValidity('Debes confirmar tu contraseña, no la olvides');
  } else if (nameInput.value === "") {
    nameInput.setCustomValidity('Información importante para tu perfil');
  }
  else {
    emailInput.setCustomValidity("");
    passwordInput.setCustomValidity("");
    passwordConf.setCustomValidity("");
    nameInput.setCustomValidity("");
 }
};

//   Validación al cambiar input
export const emailPassVal = (input, value) => {
  input.addEventListener('input', function () {
    if (input.validity.typeMismatch) {
      input.setCustomValidity("¡Hey, espera! Este no es un correo válido, intenta de nuevo agregando un @");
    } else if (input.value === "") {
      input.setCustomValidity('¡Espera! No olvides colocar tu ' + value);
    } else {
      input.setCustomValidity("");
    }
  });
};
