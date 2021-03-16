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
  <p>¿Seguro que deseas salir?</p>
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

export const deleteConfirmation = `
<div class="modal-msg">
  <p>¿Seguro que deseas borrar este post?</p>
    <div class="button-container">
    <button id= "yesDelete">Sí</button>
    <button id= "noDelete">No</button>
    </div>
</div>`;

export const postModal = (img, name) => {
  const postModalTemplate = `
  <div class= 'post'>
    <div class= 'userInfoPost'>
      <img src="${img}" alt="">
      <p>${name}</p>
      <figure class="close">
        <img src= "https://user-images.githubusercontent.com/75234502/108016913-3acc8380-6fd9-11eb-84ba-297a450edb1f.png">
      </figure>
    </div>
    <div class= 'post_recipie'>
      <figure>
        <img  class= "imgLoadPost" id= "imgLoadPost" src="" alt="Image preview...">
      </figure>
      <form action="#" onsubmit="return false">
        <input name="postImg" type="file" id="imgFile" accept="image/*" class="input-file">
        <textarea name="post" rows="10" cols="40" id= "postText" required></textarea>
        <button type= "submit" id= 'btnCreatePost'>Enviar</button>
      </form>
    </div>
  </div>`;
  return postModalTemplate;
};

export const editPostModal = (photo, name, post) => {
  const editPostModalTemplate = `
<div class= 'post'>
  <div class= 'userInfoPost'>
    <img src="${photo}" alt="">
    <p>${name}</p>
    <figure class="close">
      <img src= "https://user-images.githubusercontent.com/75234502/108016913-3acc8380-6fd9-11eb-84ba-297a450edb1f.png">
    </figure>
  </div>
  <div class= 'post_recipie'>
    <figure>
      <img  class= "imgLoadPost" id= "imgLoadPostEdit" src="" alt="Image preview...">
    </figure>
    <form action="#" onsubmit="return false">
      <input name="postImg" type="file" id="imgFileEdit" accept="image/*" class="input-file">
      <textarea name="post" rows="10" cols="40" id= "postTextEdit" placeholder= 'Edita tu post' required>${post}</textarea>
      <button type= "submit" id= 'btnEditPost'>Enviar</button>
    </form>
  </div>
</div>`;
  return editPostModalTemplate;
};

export const addComment = (photo, name) => {
  const editPostModalTempl = `
  <div class= 'post'>
    <div class= 'userInfoPost'>
      <img src="${photo}" alt="">
      <p>${name}</p>
      <figure class="close">
        <img src= "https://user-images.githubusercontent.com/75234502/108016913-3acc8380-6fd9-11eb-84ba-297a450edb1f.png">
      </figure>
    </div>
    <div class= 'post_recipie'>
      <form action="#" onsubmit="return false">
        <textarea name="post" rows="10" cols="40" id= "postCommentText" placeholder= 'Agrega un comentario' required></textarea>
        <button type= "submit" id= 'btnAddComment'>Enviar</button>
      </form>
    </div>
  </div>`;
  return editPostModalTempl;
};
