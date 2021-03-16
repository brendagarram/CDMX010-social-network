export const postHome = (photo, name, post, photoCurrentUser,
  tasteLikes, cookLikes, docId,
  imgTasteLikes, imgCookLikes, postImg, date) => {
  const postWithInfo = `
  <article class = 'postHome-container'>
    <div class= 'post-userInfo-container'>
      <figure class= 'post-imgUser'>
      <img src="${photo}" alt="">
    </figure>
    <p class= 'post-nameUser'>${name}</p>
    </div>
    <div class= 'post-container'>
      <img src=${postImg} alt="" class="view-1" id='view-1'>
      <p class="view-2">${post}</p>
    </div>
    <div class= 'post-interaction-container'>
      <div class= 'post-icons-container'>
        <figure class= 'post-likes-taste'>
          <acronym title="Me gusta"><img class = 'post-likes' data-id= ${docId} data-name= 'tasteLike' src=${imgTasteLikes} alt="taste-icon"></acronym>
        </figure>
        <p>${tasteLikes}</p>
        <figure class= 'post-likes-cook'>
          <acronym title="Guardar post"><img class = 'post-likes' data-id= ${docId} data-name= 'cookLike' src=${imgCookLikes} alt="cook-icon" id= 'post-likes-cook'></acronym>
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

export const commentsTemplate = (userCommentPhoto, i, comment) => {
  const commentTem = `
<div class= 'post-indComment-container'>
  <figure class= 'post-currentUserPhoto'>
    <img src="${userCommentPhoto[i]}" alt="">
  </figure>
  <p class='post-comment'>${comment}</p>
</div>`;
  return commentTem;
};

export const commentTemplate = (userCommentPhoto, comment, docId) => {
  const commentTempl = `
  <div class= 'post-FirstComment-container' id='post-FirstComment-container-${docId}'>
    <div class= 'post-firstIndComment-container'>
      <figure class= 'post-currentUserPhoto'>
        <img src="${userCommentPhoto[userCommentPhoto.length - 1]}" alt="">
      </figure>
      <p class='post-comment'>${comment[comment.length - 1]}</p>
    </div>
    <p id='post-comments-${docId}' class= 'post-moreComments' data-id= ${docId}>Ver más comentarios</p>
  </div>`;
  return commentTempl;
};
