import { logIn } from './lib/logIn.js';
import { home } from './lib/home.js';
import { profile } from './lib/profile.js'
import { signUp } from './lib/signUp.js';
import { error404 } from './lib/error404.js';
import {
  createUser,
  logInEmailPass,
  authGitHub,
  authGoogle,
  authFacebook,
} from './userFireBase.js';
import { showModals } from './showModals.js'
import {signOutConfirmation, editProfileModal} from './modales.js'
//import { profile } from './profile.js';

const rootDiv = document.getElementById('root');

const routes = {
  '#/signup/': signUp,
  '#/': home,
  '#/profile/': profile,
};
//  Renderiza el componente de la primera página cuando ésta carga
function router() {
  const { hash } = window.location;
  if (Object.keys(routes).includes(hash)) {
    rootDiv.innerHTML = routes[hash];
  } else if (hash !== '') {
    rootDiv.innerHTML = error404;
  }
}

//  Log in con correo, github, google, facebook

const loginFacebook = () => {
  const btnFecebook = document.getElementById('logInFacebook');
  btnFecebook.addEventListener('click', authFacebook);
}

const loginGitHub = () => {
  const logInGithub = document.getElementById('logInGithub');
  logInGithub.addEventListener('click', authGitHub);
}

const loginGmail = () => {
  const logInGoogleButton = document.getElementById('logInGoogleButton');
  logInGoogleButton.addEventListener('click', authGoogle);
}

const logInData = () => {
  //  Validación correo
  const formLogIn = document.forms.logInForm;
  const email = document.getElementById('logInEmail');
  formLogIn.addEventListener('input', function () {
    if (email.validity.typeMismatch) {
      email.setCustomValidity("¡Hey, espera! Este no es un correo válido, intenta de nuevo agregando un @");
    } else if (email.value === "") {
      email.setCustomValidity('No olvides colocar tu correo');
    } else {
      email.setCustomValidity("");
  }
  });
  //  Submit
  formLogIn.addEventListener('submit', () => {
    const email = formLogIn.logInEmail.value;
    const password = formLogIn.logInPassword.value;
    logInEmailPass(email, password);
  });
};

//  Mostrar contraseña
const showPassword = (e, element) => {
  if (e.target.classList.contains('show')) {
    e.target.classList.remove('show');
    e.target.classList.add('hide');
    element.type = 'text';
  } else {
    console.log(e.target.classList);
    e.target.classList.add('show');
    e.target.classList.remove('hide');
    element.type = 'password';
  }
};

// Creación de cuenta
const signUpData = () => {
  const formSignUp = document.forms.signUpForm;
  const inputPasswordSignUp = formSignUp.signUpPassword;
  const inputPasswordSignUpConfi = formSignUp.signUpPasswordConfirm;
  //  Mostrar contraseña
  document.querySelector('.signUpPassword-container span').addEventListener('click', e => {showPassword(e, inputPasswordSignUp)});
  document.querySelector('.signUpPasswordConfirm-container span').addEventListener('click', e => {showPassword(e, inputPasswordSignUpConfi)});

  //  Validación correo
  formSignUp.addEventListener('input', function () {
    let emailSignUp = document.getElementById('signUpEmail');
    if (emailSignUp.validity.typeMismatch) {
      emailSignUp.setCustomValidity("¡Hey, espera! Este no es un correo válido, intenta de nuevo agregando un @");
    } else if (emailSignUp.value === "") {
      emailSignUp.setCustomValidity('No olvides colocar tu correo');
    } else {
      emailSignUp.setCustomValidity("");
    }
  });
  formSignUp.addEventListener('submit', () => {
    const name = formSignUp.signUpName.value;
    const email = formSignUp.signUpEmail.value;
    const passwordSignUp = formSignUp.signUpPassword.value;
    const passwordConfirm = formSignUp.signUpPasswordConfirm.value;
    console.log(passwordSignUp);
    console.log(passwordConfirm);
    //  Validación de confirmación de contraseña
    if (passwordSignUp === passwordConfirm) {
      createUser(email, passwordSignUp, name);
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
    });
  };

// Menú hamburguesa
function showMenu(disable, enable) {
  const btnMenu = document.getElementById('btn-menu');
  btnMenu.addEventListener('click', () => {
    const menu = document.getElementById('menu-open');
    console.log(menu);
    if (menu.classList.contains(disable)) {
      menu.classList.remove(disable);
      menu.classList.add(enable);
    } else {
      menu.classList.remove(enable);
      menu.classList.add(disable);
    }
  });
}

// Ir a home
function goHome(btnId) {
  const btnHome = document.getElementById(btnId);
  btnHome.addEventListener('click', () => {
    window.location.hash = '#/';
  });
}

function goProfile() {
  const btnProfile = document.getElementById('header-home_goToProfile');
  btnProfile.addEventListener('click', () => {
    window.location.hash = '#/profile/';
  });
}
/*
//  Salir de la app
const signOut = () => {
  const signOutBtn = document.getElementsByClassName("signOut");
  console.log(signOutBtn);
  for (const button of signOutBtn) {
    console.log(button);
    button.addEventListener('click', () => {
      showModals(signOutConfirmation);
    })
  }
}
*/
//  Info perfil
const getUserData = () => {
  const userImage = document.getElementById('header-home_goToProfile');
  const userName = document.getElementById('header-profileInfo_name');
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.photoURL);
      var user = firebase.auth().currentUser;
      let photo = user.photoURL;
      let name = user.displayName;
      let email = user.email;
      userName.textContent = name;
      if (window.location.hash === '#/profile/') {
        const userEmail = document.getElementById('header-profileInfo_email');
        userEmail.textContent = email;
      }
      if(photo != null) {
        userImage.src = photo;
      } else {
        let src = 'https://user-images.githubusercontent.com/75234502/108898773-3c033f00-75dd-11eb-9af9-8cfdffcff204.png'
        console.log(src);
        userImage.src = 'https://user-images.githubusercontent.com/75234502/108898773-3c033f00-75dd-11eb-9af9-8cfdffcff204.png';
      }
      
      /*if (window.location.hash === '#/profile/') {
        let photo = user.photoURL;
        let name = user.displayName;
        userImage.src = photo;
        userName.textContent = name;
      } else { //probar qué se quiso hacer aquí 
        const displayName = user.displayName;
        const photo = user.photoURL;
        userName.textContent = displayName;
        userImage.src = photo;
      }*/
    }
  });
};

/*
// Opción editar perfil
const editProfile = () => {
  let imgURL;
  const editBtn = document.getElementById('header-profile_editProfile');
  editBtn.addEventListener('click', () => {
    console.log('Editar');
    showModals(editProfileModal);
    let user = firebase.auth().currentUser;
    const buttonEdit = document.getElementById('saveEdit');
    let file = document.getElementById('file');
    file.addEventListener('change', () => {
    const previewImg = document.getElementById('imgLoad');
    let archivo = document.getElementById("file").files[0];
    console.log(archivo);
    imgURL = URL.createObjectURL(archivo);
    previewImg.src = imgURL
      });
    buttonEdit.addEventListener('click', () => {
      let nameProfile = document.getElementById('nameProfInput').value;
      console.log(nameProfile);
      if (nameProfile === '') {
        nameProfile = user.displayName;
        console.log('Igual')
      } else if (nameProfile != ''){
        console.log('Cambio');
        nameProfile = nameProfile;
      }
      updateProfile(imgURL, nameProfile);
      })
  })
}

// Actualizar perfil
const updateProfile = (img, name) => {
  console.log(img);
  console.log(name);
  let user = firebase.auth().currentUser;
  user.updateProfile({
  photoURL: img,
  displayName: name,
}).then(function(result) {
    let imgProf = document.getElementById('header-home_goToProfile');
    imgProf.src = img;
    let nameDiv = document.getElementById('header-profileInfo_name');
    //let user = firebase.auth().currentUser;
    let name = user.displayName;
    console.log(name);
    nameDiv.textContent = name;
    const close = document.getElementsByClassName("close")[0];
    close.onclick();
    console.log(user.displayName);
    console.log(user.photoURL);
}).catch(function(error) {
  console.log(error);
});
}

*/

// Opción editar perfil
const editProfile = () => {
  let imgURL;
  const editBtn = document.getElementById('header-profile_editProfile');
  editBtn.addEventListener('click', () => {
    console.log('Editar');
    showModals(editProfileModal);
    let user = firebase.auth().currentUser;
    const buttonEdit = document.getElementById('saveEdit');
    let file = document.getElementById('file');
    file.addEventListener('change', () => {
      let imgFile = document.getElementById("file").files[0];
      console.log(imgFile);
      const previewImg = document.getElementById('imgLoad');
      imgURL = URL.createObjectURL(imgFile);
      previewImg.src = imgURL;
      });
    buttonEdit.addEventListener('click', () => {
      let nameProfile = document.getElementById('nameProfInput').value;
      let imgFile = document.getElementById("file").files[0];
      console.log(imgFile);
      console.log(nameProfile);
      if (nameProfile === '') {
        nameProfile = user.displayName;
        console.log('Igual')
      } else if (nameProfile != ''){
        console.log('Cambio');
        nameProfile = nameProfile;
      }
      updateProfile(imgFile, nameProfile);
      })
  })
}

// Actualizar perfil
const updateProfile = (img, name) => {
  console.log(img);
  console.log(name);
  let user = firebase.auth().currentUser;
  console.log(firebase);
  let storageRef = storage.ref('/userPrifileImgs/' + img.name);
  let uploadTask = storageRef.put(img);
  uploadTask.on('state-changed', function (snapshot) {

  }.then = (() => {
    console.log('archivo subido');
  })
  .catch((error) => {
      console.log(error);
  })
)
}


// Obtener elementos dependiendo de la página
const getElements = () => {
  if (window.location.href === 'http://localhost:5000/') {
    logInData();
    loginFacebook();
    loginGitHub;
    loginGmail();
  } else if (window.location.hash === '#/signup/') {
    signUpData();
  } else if (window.location.hash === '#/' /*|| window.location.hash === '#/profile/'*/) {
    showMenu('disable-menu-desplegable', 'enable-menu-desplegable');
    //signOut();
    getUserData();
    goHome('header-home_goToHome');
    goProfile();
   } else if (window.location.hash === '#/profile/') {
    getUserData();
    goHome('header-profile_goToHome');
    editProfile();
    showMenu('disable-menu-desplegable-profile', 'enable-menu-desplegable-profile');
    //signOut();
    }
}

//  Muestra, imprime o renderiza el componente de la primera página cuando ésta carga
const render = async () => {
  const viewWelcome = logIn;
  rootDiv.innerHTML = await (viewWelcome);
  const route = window.location.hash;
  router(route);
  getElements();
};

window.addEventListener('DOMContentLoaded', render);
window.addEventListener('hashchange', render);
