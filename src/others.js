import { currentUserConf } from './userFireBase.js';

//  Mostrar contraseña
export const showPassword = (e, element) => {
  const domElement = element;
  if (e.target.classList.contains('passwordBtn-show')) {
    e.target.classList.remove('passwordBtn-show');
    e.target.classList.add('passwordBtn-hide');
    domElement.type = 'text';
  } else {
    e.target.classList.remove('passwordBtn-hide');
    e.target.classList.add('passwordBtn-show');
    domElement.type = 'password';
  }
};

// Mostrar mensajes de error
export const showError = (container) => {
  const domContainer = container;
  setTimeout(() => { domContainer.style.visibility = 'hidden'; }, 3000);
};

// Menú hamburguesa
export const showMenu = (disable, enable) => {
  const btnMenu = document.getElementById('btn-menu');
  btnMenu.addEventListener('click', () => {
    const menu = document.getElementById('menu-open');
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
export const goNextPage = (btnId, hashRoute) => {
  const btnHome = document.getElementById(btnId);
  btnHome.addEventListener('click', () => {
    const currentUser = currentUserConf();
    if (currentUser) {
      window.location.hash = hashRoute;
    } else {
      window.location.replace('http://localhost:5000');
    }
  });
};

let imgURL;
// Cargar preview img
export const previewImg = (file, preview) => {
  const fileImg = document.getElementById(file);
  fileImg.addEventListener('change', () => {
    //  Url para mostrar un preview de la img
    const imgFile = document.getElementById(file).files[0];
    const previewImgEl = document.getElementById(preview);
    imgURL = URL.createObjectURL(imgFile);
    previewImgEl.src = imgURL;
  });
};
