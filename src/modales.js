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
    <p>Editar perfil</p>
    <figure>
      <img  class= "imgLoad" id= "imgLoad" src="" height="50" alt="Image preview...">
    </figure>
  <div>
  <div>
    <input type="file" id="file" accept="image/*">
    <label for="">Nombre</label>
    <input type="text" id="nameProfInput">
    <button id="saveEdit">Guardar</button>
  </div>
</div>
`;

export const postModal = `
<div class= 'post'>
  <div class= 'userInfoPost'>
    <img src="" alt="">
    <p></p>
    <figure class="close">
      <img src= "https://user-images.githubusercontent.com/75234502/108016913-3acc8380-6fd9-11eb-84ba-297a450edb1f.png">
    </figure>
  </div>
  <div class= 'post_recipie'>
    <textarea name="post" rows="10" cols="40" id= "postText"></textarea>
  </div>
  <button id= 'btnCreatePost'>Enviar</button>
</div>`;
