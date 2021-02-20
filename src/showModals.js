import { editProfileModal, signOutConfirmation} from './modales.js';
import { signOutFire } from './userFireBase.js';

export const showModals = (message) => {
 const modalCont = document.getElementById('homeWelcome-modal_container');
 const close = document.getElementsByClassName("close")[0];
 const modal = document.getElementById('homeWelcome-modal_msg');
 modalCont.style.display = 'block';
 modal.innerHTML = message;
 console.log(modal);
 close.onclick = function() {
  modalCont.style.display = "none";
 }
 window.onclick = function(event) {
   if (event.target == modalCont) {
     modalCont.style.display = "none";
   }
 }
 if (message == signOutConfirmation) {
  console.log('sí');
  const yesBtn = document.getElementById('yesSignOut');
  console.log(yesBtn);
  const noBtn = document.getElementById('no');
  yesBtn.addEventListener('click', () => {
   signOutFire();
  })
  noBtn.addEventListener('click', () => {
   close.onclick();
  })
 }
 }
 
 



