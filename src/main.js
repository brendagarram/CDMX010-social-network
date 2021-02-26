import { logIn } from './lib/logIn.js';
import { home } from './lib/home.js';
import { profile } from './lib/profile.js'
import { signUp } from './lib/signUp.js';
import { error404 } from './lib/error404.js';
import { getUserData, editProfile } from './profileFunctions.js';
import { authGitHub, authGoogle, authFacebook } from './userFireBase.js';
import { logInProvider, logInData, signUpData, signOut } from './register.js';
import { createPost, loadPost } from './postFunctions.js';



const rootDiv = document.getElementById('root');


const routes = {
  '#/signup/': signUp,
  '#/': home,
  '#/profile/': profile,
};

//  Renderiza las páginas dependiendo de su hash
export const router = (hash) => {
  window.location.hash = hash;
  if (Object.keys(routes).includes(hash)) {
    rootDiv.innerHTML = routes[hash];
    getElements();
  } else if (hash !== '') {
    rootDiv.innerHTML = error404;
  }
}

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
};

// Cambiar de página por el menú
function goNextPage(btnId, hashRoute) {
  const btnHome = document.getElementById(btnId);
  btnHome.addEventListener('click', () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        window.location.hash = hashRoute;
        console.log('usuario logueado');
      } else {
        window.location.replace('http://localhost:5000');
        console.log('usuario no logueado');
      }
    });
  });
}

// Obtener elementos dependiendo de la página
const getElements = () => {
  if (window.location.href === 'http://localhost:5000/') {
    logInData();
    logInProvider('logInFacebook', authFacebook);
    logInProvider('logInGithub', authGitHub);
    logInProvider('logInGoogleButton', authGoogle);
  } else if (window.location.hash === '#/signup/') {
    signUpData();
  } else if (window.location.hash === '#/') {
    showMenu('disable-menu-desplegable', 'enable-menu-desplegable');
    signOut();
    getUserData();
    goNextPage('header-home_goToHome', '#/');
    goNextPage('header-home_goToProfile', '#/profile/');
    loadPost('home-post-container');
   } else if (window.location.hash === '#/profile/') {
    showMenu('disable-menu-desplegable-profile', 'enable-menu-desplegable-profile');
    getUserData();
    signOut();
    loadPost('profile-post-container');
    goNextPage('header-profile_goToHome', '#/');
    editProfile();
    createPost();
    
    }
}

//  Muestra, imprime o renderiza el componente de la primera página cuando ésta carga
const render = async () => {
  if (window.location.href === 'http://localhost:5000/') {
    const logInPage = logIn;
    rootDiv.innerHTML = await (logInPage);
    console.log('soy el home')
    getElements();
  } else {
  let hash = window.location.hash;
  router(hash);
  }
};

window.addEventListener('DOMContentLoaded', render);
window.addEventListener('hashchange', render);

