import { postModal } from './modales.js';
import { post } from './lib/post.js';
//  Crear post
export const createPost = () => {
  let inputProfile = document.getElementById('createPost');
  console.log(inputProfile);
  inputProfile.addEventListener('click', showPostModal);
}

//  Modal post
const showPostModal = () => {
  const modalPostCont = document.getElementById('postModal_container');
  const modalMsg = document.getElementById('postModalInfo');
  modalPostCont.style.display = 'flex';
  modalMsg.innerHTML = postModal;
  sendPostFire();
  const user = firebase.auth().currentUser;
  let nameUserPost = document.querySelector('.userInfoPost p');
  let imgUserPost = document.querySelector('.userInfoPost img');
  nameUserPost.innerHTML = user.displayName;
  imgUserPost.src = user.photoURL;
  const close = document.getElementsByClassName("close")[1];
  close.onclick = function() {
    modalPostCont.style.display = 'none';
  }
  window.onclick = function(event) {
    if (event.target == modalPostCont) {
      modalPostCont.style.display = 'none';
    }
  }
}

//  Mandar los post a firebase
const sendPostFire = () => {
  const btnPost = document.getElementById('btnCreatePost');
  btnPost.addEventListener('click', async () => {
    const textareaPost = document.getElementById('postText').value;
    let user = firebase.auth().currentUser;
    const modalPostCont = document.getElementById('postModal_container');
    modalPostCont.style.display = 'none';
    await postInfoPost(user.uid, user.photoURL, user.email, user.displayName, textareaPost, 0, 0);
 })
}

//  Crear una colección en firebase con los datos del post
const postInfoPost= (uid, photo, usermail, name, post, tasteLikes, cookLikes)=>{
  firestore.collection('posts').doc().set({
      uid,
      photo,
      usermail,
      name,
      post,
      tasteLikes,
      cookLikes
 });
}

//  Se hace una "captura" /snpashot/ de los contenidos de la colección hasta ese momento. Ejecuta una función que se llama a sí misma
const getPostInfo = (callbackFunction) => firestore.collection('posts').onSnapshot(callbackFunction); //onSnapshot es un controlador de instantáneas

//  Cargar los post en el home
export const loadPost = (element) => {
  let postContainer = document.getElementById(element);
  getPostInfo ((querySnapshot) => {
    postContainer.innerHTML = '';
    querySnapshot.forEach(doc => {
     //console.log(doc.id, " => ", doc.data());
      let user = firebase.auth().currentUser;
      let postInfo = doc.data();
      postContainer.innerHTML += post(postInfo.photo, postInfo.name, postInfo.post, user.photoURL, postInfo.tasteLikes, postInfo.cookLikes);
      //const tasteIcon = document.querySelectorAll('.post-likes-taste_icon');
     //const cookIcon = document.querySelector('.post-likes-cook');
      //console.log(tasteIcon);
     //console.log(cookIcon);
      /*for (const btn of tasteIcon) {
        console.log(btn);
        btn.addEventListener('click', e => {likesState(e, btn, postInfo.tasteLikes)});
        console.log(postInfo.tasteLikes);
      }
     //document.querySelector('.post-likes-cook').addEventListener('click', e => {likesState(e, cookIcon)});*/
    });
  });
};


/*const likeTaste = 'https://user-images.githubusercontent.com/75234502/109266301-7cc1aa80-77cd-11eb-940f-2767ca46832d.png';
const unlikeTaste = 'https://user-images.githubusercontent.com/75234502/108979210-0ba8b880-7650-11eb-9b3b-048ed6294403.png';
//  Función dar y quitar likes
const likesState = (e, element, likes) => {
  console.log(element);
    if (e.target.classList.contains('post-likes-taste_icon')) {
      e.target.classList.remove('post-likes-taste_icon');
      e.target.classList.add('post-likes-taste-add');
      element.src = likeTaste;
      likes += 1;
   //element.type = 'text';
   //console.log(element.type)
  } else {
    console.log(e.target.classList);
    e.target.classList.remove('post-likes-taste-add');
    e.target.classList.add('post-likes-taste_icon');
    element.src = unlikeTaste;
    likes -= 1;
   //element.type = 'password';
  }
};*/