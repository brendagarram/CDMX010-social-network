import { logIn } from './lib/logIn.js';
import { home } from './lib/home.js';
import { profile } from './lib/profile.js';
import { signUp } from './lib/signUp.js';
import { error404 } from './lib/error404.js';
import { getUserData, editProfile } from './profileFunctions.js';
import { authGitHub, authGoogle, authFacebook } from './userFireBase.js';
import {
  logInProvider, logInData, signUpData, signOut,
} from './registerData.js';
import {
  createPost, loadPost, editPost, deletePost, likesState,
  addComments, rotate, showMoreComments, showLessComments,
} from './postFunctions.js';
import { showMenu, goNextPage } from './others.js';
import { favoritePost } from './lib/favoritePost.js';


const rootDiv = document.getElementById('root');

export const routes = {
  'http://localhost:5000/': logIn,
  '#/signup/': signUp,
  '#/': home,
  '#/profile/': profile,
  '#/favoritePost/': favoritePost,
};

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
    getUserData();
    goNextPage('header-home_goToHome', '#/');
    goNextPage('header-home_goToProfile', '#/profile/');
    loadPost('home-post-container');
    signOut();
  } else if (window.location.hash === '#/profile/') {
    showMenu('disable-menu-desplegable-profile', 'enable-menu-desplegable-profile');
    getUserData();
    loadPost('profile-post-container');
    goNextPage('header-profile_goToHome', '#/');
    editProfile();
    createPost();
    signOut();
  } else if (window.location.hash === '#/favoritePost/') {
    showMenu('disable-menu-desplegable-favorite', 'enable-menu-desplegable-favorite');
    goNextPage('header-home_goToHome', '#/');
    goNextPage('header-home_goToProfile', '#/profile/');
    getUserData();
    loadPost('favorite-post-container');
    signOut();
  }
};

//  Renderiza las páginas dependiendo de su hash
export const router = () => {
 let hash;
 if (window.location.hash) {
   hash = window.location.hash;
 } else {
   hash = 'http://localhost:5000/';
 }
 if (Object.keys(routes).includes(hash)) {
   rootDiv.innerHTML = routes[hash];
   getElements();
 } else if (hash !== '') {
   rootDiv.innerHTML = error404;
 }
};


rootDiv.addEventListener('click', (e) => {
  if (e.target.classList.contains('post-profile-editPost')) {
    editPost(e);
  } else if (e.target.classList.contains('post-profile-deletePost')) {
    deletePost(e);
  } else if (e.target.classList.contains('post-likes')) {
    likesState(e);
  } else if (e.target.classList.contains('post-comments')) {
    addComments(e);
  } else if (e.target.classList.contains('view-1') || e.target.classList.contains('view-2')) {
    rotate(e);
  } else if (e.target.classList.contains('post-moreComments')) {
    showMoreComments(e);
  } else if (e.target.classList.contains('post-lessComments')) {
    showLessComments(e);
  }
});

window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);

/*  //  Muestra, imprime o renderiza el componente de la primera página cuando ésta carga
export const onNavigate =(route)=>{
  console.log(route)
  window.history.pushState(
      {},
      "",
      window.location.origin + route
  );
    rootDiv.innerHTML = routes[route];
    window.onpopstate = () => {
      console.log('Hi');
      console.log(window.location);
      rootDiv.innerHTML = routes[window.location.pathname];
    }
    getElements();
};
const routes = {
  '/login/': logIn,
  '/signup/': signUp,
  '/': home,
  '/profile/': profile,
}

window.addEventListener('DOMContentLoaded', onNavigate('/login/'));
*/
