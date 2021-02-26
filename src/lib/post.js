export const post = (photo, name, post, photoCurrentUser, tasteLikes, cookLikes) => {
 let postWithInfo =
 `<article class = 'postHome-container'>
   <div class= 'post-userInfo-container'>
    <figure class= 'post-imgUser'>
     <img src="${photo}" alt="">
    </figure>
    <p class= 'post-nameUser'>${name}</p>
   </div>
   <div class= 'post-container'>
    <textarea disabled name="" id="" cols="30" rows="10">${post}</textarea>
   </div>
   <div class= 'post-interaction-container'>
    <div class= 'post-icons-container'>
     <figure class= 'post-likes-taste'>
      <img class= 'post-likes-taste_icon' src="https://user-images.githubusercontent.com/75234502/108979210-0ba8b880-7650-11eb-9b3b-048ed6294403.png" alt="taste-icon">
     </figure>
     <p>${tasteLikes}</p>
     <figure class= 'post-likes-cook'>
      <img src="" alt="cook-icon" id= 'post-likes-cook'>
     </figure>
     <p>${cookLikes}</p>
     </div>
     <div class= 'post-comments-container'>
      <figure class= 'post-currentUserPhoto'>
       <img src="${photoCurrentUser}" alt="">
      </figure>
      <textarea name="" id="" cols="30" rows="10" placeholder= 'Agrega un comentario...'></textarea>
    </div>
   </div>
  </article>`
return postWithInfo; };
