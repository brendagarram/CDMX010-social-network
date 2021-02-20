import { logIn } from './lib/logIn.js';
import { home } from './lib/home.js';
import { profilePage } from './lib/profile.js'
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
  '#/profile/': profilePage,
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
const logInData = () => {
  document.getElementById('error--message').style.display = 'none';
  const formLogIn = document.forms.logInForm;
  const logInGithub = document.getElementById('logInGithub');
  logInGithub.addEventListener('click', authGitHub);
  const logInGoogleButton = document.getElementById('logInGoogleButton');
  logInGoogleButton.addEventListener('click', authGoogle);
  const btnFecebook = document.getElementById('logInFacebook');
  btnFecebook.addEventListener('click', authFacebook);
  formLogIn.addEventListener('submit', () => {
    const email = formLogIn.logInEmail.value;
    const password = formLogIn.logInPassword.value;
    logInEmailPass(email, password);
  });
};

// Creación de cuenta
const signUpData = () => {
  const formSignUp = document.forms.signUpForm;
  formSignUp.addEventListener('submit', () => {
    document.getElementById('error--message--signUp').style.display = 'none';
    const name = formSignUp.signUpName.value;
    const email = formSignUp.signUpEmail.value;
    const password = formSignUp.signUpPassword.value;
    createUser(email, password, name);
  });
};

// Menú hamburguesa
function showMenu() {
  const btnMenu = document.getElementById('btn-menu');
  //  console.log(btnMenu);
  btnMenu.addEventListener('click', () => {
    const menuu = document.getElementById('open');
    //  console.log(menuu);
    if (menuu.classList.contains('disable-menu-desplegable')) {
      menuu.classList.remove('disable-menu-desplegable');
      menuu.classList.add('enable-menu-desplegable');
    } else {
      menuu.classList.remove('enable-menu-desplegable');
      menuu.classList.add('disable-menu-desplegable');
    }
  });
}

// Ir a home
function goHome() {
  const btnHome = document.getElementById('home');
  btnHome.addEventListener('click', () => {
    window.location.hash = '#/';
  });
}

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

//  Info perfil
const datos = () => {
  const userImage = document.getElementById('picture');
  const userImageDesktop = document.getElementById('perfil-desktop');
  const userName = document.getElementById('name');
  const userEmail = document.getElementById('email');
  let nameProfile = document.getElementById('nameProfilePrinc');
  let imgProf = document.getElementById('imgProfile');
  let emailProf = document.getElementById('email-usuario');
  const data = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (window.location.hash === '#/profile/') {
          let photo = user.photoURL;
          let name = user.displayName;
          let email = user.email;
          emailProf.innerHTML= email;
          nameProfile.innerHTML= name;
          userImage.src = photo;
          imgProf.src = photo;
        } else {
          const displayName = user.displayName;
          const photo = user.photoURL;
          const emailUser = user.email;
          userName.textContent = displayName;
          userEmail.textContent = emailUser;
          userImage.src = photo;
          userImageDesktop.src = photo;
        }
      }
    });
  };
  data();
};


// Opción editar perfil
const editProfile = () => {
  let imgURL;
  const editBtn = document.getElementById('editProfile');
  editBtn.addEventListener('click', () => {
    showModals(editProfileModal);
    let user = firebase.auth().currentUser;
    const buttonEdit = document.getElementById('saveEdit');
    let file = document.getElementById('file');
    let nameProfile = document.getElementById('nameProfInput').value;
    file.addEventListener('change', () => {
    const previewImg = document.getElementById('imgLoad');
    let archivo = document.getElementById("file").files[0];
    if (nameProfile === '') {
      nameProfile = user.displayName;
    }
    imgURL = URL.createObjectURL(archivo);
    previewImg.src = imgURL;
    buttonEdit.addEventListener('click', () => {
      if (nameProfile === '') {
        nameProfile = user.displayName;
          updateProfile(imgURL, nameProfile);
      } else {
        updateProfile(imgURL, nameProfile);
      }
        })
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
    let imgProf = document.getElementById('imgProfile');
    const userImage = document.getElementById('picture');
    imgProf.src = img;
    userImage.src = img;
    let nameDiv = document.getElementById('nameProfilePrinc');
    //let user = firebase.auth().currentUser;
    let name = user.displayName;
    nameDiv.textContent = name;
    const close = document.getElementsByClassName("close")[0];
    close.onclick();
}).catch(function(error) {
  console.log(error);
});
}

// Obtener elementos dependiendo de la página
const getElements = () => {
  if (window.location.href === 'http://localhost:5000/') {
    logInData();
  } else if (window.location.hash === '#/signup/') {
    signUpData();
  } else if (window.location.hash === '#/' /*|| window.location.hash === '#/profile/'*/) {
    showMenu();
    signOut();
    datos();
    goHome();
   } else if (window.location.hash === '#/profile/') {
    //profileInfo();
    editProfile();
    datos();
    showMenu();
    signOut();
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
//window.addEventListener('hashchange', getElements);
//window.addEventListener('load', logInData);
