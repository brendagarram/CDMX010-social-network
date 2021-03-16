export const postProfile = (photo, name, post, photoCurrentUser,
  tasteLikes, cookLikes, docId, imgTasteLikes, imgCookLikes, postImg, date) => {
  const postWithInfo = `
  <article class = 'postHome-container'>
    <div class= 'postProfile-userInfo-container'>
      <div>
        <figure class= 'post-imgUser'>
          <img src="${photo}" alt="">
        </figure>
        <p class= 'post-nameUser'>${name}</p>
      </div>
      <div class= 'post-profile-btn-container'>
        <acronym title="Eliminar post"><img class= 'post-profile-deletePost' data-id= ${docId} src="https://user-images.githubusercontent.com/75234502/109595758-bbf84000-7ada-11eb-8ea1-ea136da31a84.png" alt="ícono-eliminar"></acronym>
        <acronym title="Editar post"><img class= 'post-profile-editPost' id= 'post-profile-editPost-${docId}' data-id= ${docId} src="https://user-images.githubusercontent.com/75234502/109595807-cf0b1000-7ada-11eb-91ee-9b84d0c7bbef.png" alt="ícono-editar"></acronym>
      </div>
    </div>
    <div class= 'post-container' id='post-container'>
      <img src=${postImg} alt="" class="view-1">
      <p class="view-2">${post}</p>
    </div>
    <div class= 'post-interaction-container'>
      <div class= 'post-icons-container'>
        <figure class= 'post-likes-taste'>
          <acronym title="Me gusta"><img class= 'post-likes' data-id= ${docId} data-name= 'tasteLike' src=${imgTasteLikes} alt="taste-icon"></acronym>
        </figure>
        <p>${tasteLikes}</p>
        <figure class= 'post-likes-cook'>
          <acronym title="Guardar post"><img class= 'post-likes' data-id= ${docId} data-name= 'cookLike' id= 'post-likes-cook' src=${imgCookLikes} alt="cook-icon"></acronym>
        </figure>
        <p>${cookLikes}</p>
      </div>
      <p class= "date">${date}</p>
    </div>
    <div class= 'post-comments-container'>
      <div class= 'post-comments-info-container'>
        <figure class= 'post-currentUserPhoto'>
          <img src="${photoCurrentUser}" alt="">
        </figure>
        <textarea class = "post-comments" data-id= ${docId} name="" id="" cols="10" rows="5" placeholder= 'Agrega un comentario...'></textarea>
      </div>
    </div>
    <div class= 'post-comments-container_add' id= 'post-comments-container_add-${docId}'>
    </div>
    <p id='post-lessComments-${docId}' class= 'post-lessComments' data-id= ${docId}>Ver menos comentarios</p>
</article>`;
  return postWithInfo;
};
