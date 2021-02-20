export const welcomeMsg = `
<div class="modal-msg">
 <p>Bienvenido a Chop, tu cuenta ha sido creada</p>
 <p>Se te ha enviado un correo para que puedas verificar tu cuenta y acceder a nuestra app</p>
</div>`;

export const noVerification = `
<div class="modal-msg">
 <p>Ups, no has verificado tu email, revisa tu correo y realiza el proceso de validación</p>
</div>`;

export const signOutConfirmation = `
<div class="modal-msg">
  <p>¿Seguro que deseas salir</p>
   <div class="button-container">
    <button id= "yesSignOut">Sí</button>
    <button id= "no">No</button>
   </div>
</div>`;

export const editProfileModal = `
<div class= "editMsg">
 <figure>
  <img  class= "imgLoad" id= "imgLoad" src="" height="70" alt="Image preview...">
 </figure>
 <input type="file" id="file" accept="image/*">
 <label for="">Nombre</label>
 <input type="text" id="nameProfInput">
 <button id="saveEdit">Guardar</button>
</div>
`;
