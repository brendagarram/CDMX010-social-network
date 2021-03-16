import { signOutConfirmation } from './modales.js';
import { signOutFire, currentUserConf } from './userFireBase.js';

const signOutConf = () => {
  const currentUser = currentUserConf();
  if (currentUser) {
    signOutFire().then(() => {
      window.location.replace('http://localhost:5000');
    })
      .catch(() => {
        alert('Vuelve a intentarlo');
      });
  } else {
    alert('Vuelve a iniciar sesión');
  }
};

export const showModals = (message) => {
  const modalCont = document.getElementById('homeWelcome-modal_container');
  const close = document.getElementsByClassName('close')[0];
  const modal = document.getElementById('homeWelcome-modal_msg');
  modalCont.style.display = 'block';
  modal.innerHTML = message;
  close.onclick = () => {
    modalCont.style.display = 'none';
  };
  window.onclick = (event) => {
    if (event.target === modalCont) {
      modalCont.style.display = 'none';
    }
  };
  if (message === signOutConfirmation) {
    const yesBtn = document.getElementById('yesSignOut');
    const noBtn = document.getElementById('no');
    yesBtn.addEventListener('click', () => {
      signOutConf();
    });
    noBtn.addEventListener('click', () => {
      close.onclick();
    });
  }
};
