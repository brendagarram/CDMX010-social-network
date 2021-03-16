import {
  postModal, editPostModal, addComment, deleteConfirmation,
} from './modales.js';
import { postHome, commentsTemplate, commentTemplate } from './lib/post.js';
import { postProfile } from './lib/postProfile.js';
import {
  currentUserConf, postInfoPost, getPostInfo, getPost, deletePostFire,
  storageRef, getDownloadURL, putImgStorage,
} from './userFireBase.js';
import { showModals } from './showModals.js';
import { previewImg } from './others.js';

//  Mostrar modal post
const modalPost = (postModalEdit) => {
  const modalPostCont = document.getElementById('postModal_container');
  const modalMsg = document.getElementById('postModalInfo');
  modalPostCont.style.display = 'flex';
  modalMsg.innerHTML = postModalEdit;
  const close = document.getElementsByClassName('close')[1];
  close.onclick = () => {
    modalPostCont.style.display = 'none';
  };
  window.onclick = (event) => {
    if (event.target === modalPostCont) {
      modalPostCont.style.display = 'none';
    }
  };
};

//  Ediatr imagen
const editImage = (doc, file) => {
  const docReference = doc.id;
  const storageReference = storageRef('/postImgs/', docReference);
  const imgFile = document.getElementById(file).files[0];
  putImgStorage(storageReference, imgFile)
    .then(() => {
      getDownloadURL(storageReference)
        .then((result) => {
          getPost(docReference).then((doc) => {
            doc.ref.update({ imgPost: result });
          });
        });
    });
};

//  Mandar los post a firebase
const sendPostFire = () => {
  const btnPost = document.getElementById('btnCreatePost');
  previewImg('imgFile', 'imgLoadPost');
  btnPost.addEventListener('click', async () => {
    const textareaPost = document.getElementById('postText').value;
    if (textareaPost !== '') {
      const user = currentUserConf();
      const modalPostCont = document.getElementById('postModal_container');
      modalPostCont.style.display = 'none';
      const imgTasteLike = 'https://firebasestorage.googleapis.com/v0/b/socialnetwork-chopprueba.appspot.com/o/likesImgs%2FtasteLike.png?alt=media&token=905c1974-5730-4380-8cb9-75aa2083f63a';
      const imgTasteNoLike = 'https://firebasestorage.googleapis.com/v0/b/socialnetwork-chopprueba.appspot.com/o/likesImgs%2FtasteNoLike.png?alt=media&token=b4c27e95-6f54-4dde-85a6-9358926afd15';
      const imgCookLike = 'https://firebasestorage.googleapis.com/v0/b/socialnetwork-chopprueba.appspot.com/o/likesImgs%2FcookLike.png?alt=media&token=3e8f6474-60ac-446c-ae9b-6ff629f458e4';
      const imgCookNolike = 'https://firebasestorage.googleapis.com/v0/b/socialnetwork-chopprueba.appspot.com/o/likesImgs%2FcookNoLike.png?alt=media&token=098a3ee5-6082-4dcb-a245-f6c1d599356a';
      const imgPost = '';
      const dateMs = Date.now();
      const date = new Date(dateMs);
      const datePost = date.toLocaleDateString();
      await postInfoPost(user.uid, user.photoURL, user.email, user.displayName,
        textareaPost, [], [], [], [], imgTasteLike,
        imgTasteNoLike, imgCookLike, imgCookNolike, imgPost, datePost, dateMs, 'posts')
        .then((docRef) => {
          editImage(docRef, 'imgFile');
        });
    } else {
      console.log('Debes colocar algo en el textarea');
    }
  });
};

//  Modal post
const showPostModal = () => {
  const user = currentUserConf();
  const postModalTemplate = postModal(user.photoURL, user.displayName);
  modalPost(postModalTemplate);
  sendPostFire();
};

//  Crear post
export const createPost = () => {
  const inputProfile = document.getElementById('createPost');
  inputProfile.addEventListener('click', showPostModal);
};

const addFirstComment = (userCommentPhoto, comments, docId) => {
  if (comments.length !== 0) {
    const commentContainer = document.getElementById(`post-comments-container_add-${docId}`);
    commentContainer.innerHTML = commentTemplate(userCommentPhoto, comments, docId);
  }
};

//  Cargar los post en el home
export const loadPost = (element) => {
  const postContainer = document.getElementById(element);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      getPostInfo((querySnapshot) => {
        postContainer.innerHTML = '';
        const currentUser = currentUserConf();
        const userUid = currentUser.uid;
        let imgTasteLikes;
        let imgCookLikes;
        let docId;
        let userCommentPhoto;
        let comments = [];
        querySnapshot.forEach((doc) => {
          //  console.log(doc.id, " => ", doc.data());
          const postInfo = doc.data();
          docId = doc.id;
          const tasteLikesUsers = postInfo.tasteLikes;
          const tasteLikesNumber = tasteLikesUsers.length;
          const cookLikesUsers = postInfo.cookLikes;
          const cookLikesNumber = cookLikesUsers.length;
          comments = postInfo.comments;
          userCommentPhoto = postInfo.userCommentPhoto;
          if (Object.values(tasteLikesUsers).includes(userUid)) {
            imgTasteLikes = postInfo.imgTasteLike;
          } else {
            imgTasteLikes = postInfo.imgTasteNoLike;
          }
          if (Object.values(cookLikesUsers).includes(userUid)) {
            imgCookLikes = postInfo.imgCookLike;
          } else {
            imgCookLikes = postInfo.imgCookNoLike;
          }
          if (postContainer.classList.contains('profile-post-container')) {
            if (postInfo.uid === userUid) {
              postContainer.innerHTML += postProfile(postInfo.photo, postInfo.name, postInfo.post,
                user.photoURL, tasteLikesNumber, cookLikesNumber, doc.id, imgTasteLikes,
                imgCookLikes, postInfo.imgPost, postInfo.date);
              if (comments.length !== 0) {
                document.getElementById(`post-comments-container_add-${docId}`).style.display = 'flex';
                addFirstComment(userCommentPhoto, comments, docId);
              }
            }
          } else if (postContainer.classList.contains('home-post-container') || (postContainer.classList.contains('favorite-post-container') && cookLikesUsers.includes(userUid))) {
            if (postInfo.uid === userUid) {
              postContainer.innerHTML += postProfile(postInfo.photo, postInfo.name, postInfo.post,
                user.photoURL, tasteLikesNumber, cookLikesNumber, doc.id, imgTasteLikes,
                imgCookLikes, postInfo.imgPost, postInfo.date);
              if (comments.length !== 0) {
                document.getElementById(`post-comments-container_add-${docId}`).style.display = 'flex';
                addFirstComment(userCommentPhoto, comments, docId);
              }
            } else {
              postContainer.innerHTML += postHome(postInfo.photo, postInfo.name, postInfo.post,
                user.photoURL, tasteLikesNumber, cookLikesNumber, doc.id, imgTasteLikes,
                imgCookLikes, postInfo.imgPost, postInfo.date);
              if (comments.length !== 0) {
                document.getElementById(`post-comments-container_add-${docId}`).style.display = 'flex';
                addFirstComment(userCommentPhoto, comments, docId);
              }
            }
          }
        });
      }, 'posts');
    }
  });
};

//  Cerrar modal
const closeModal = (key) => {
  const close = document.getElementsByClassName('close')[key];
  close.onclick();
};

//  Enviar información para editar post
const sendUpdatePost = (doc) => {
  const btnPost = document.getElementById('btnEditPost');
  btnPost.addEventListener('click', async () => {
    const textareaPost = document.getElementById('postTextEdit');
    const textPost = textareaPost.value;
    await editImage(doc, 'imgFileEdit');
    if (textPost !== doc.data().post) {
      //  console.log(doc.ref);
      doc.ref.update({ post: textPost });
      closeModal(1);
    } else if (textareaPost === '') {
      console.log('Debes colocar algo');
    } else {
      console.log('No hay actualización');
      closeModal(1);
    }
  });
};

//  EditarPost
export const editPost = (event) => {
  const postId = event.target.dataset.id;
  getPost(postId).then((doc) => {
    const docData = doc.data();
    const postModalEdit = editPostModal(docData.photo, docData.name, docData.post);
    modalPost(postModalEdit);
    previewImg('imgFileEdit', 'imgLoadPostEdit');
    sendUpdatePost(doc);
  }).catch((error) => {
    console.log('No se puede editar');
    console.log(error);
  });
};

//  Eliminar post
export const deletePost = (event) => {
  const postId = event.target.dataset.id;
  getPost(postId).then(() => {
    showModals(deleteConfirmation);
    const yesBtn = document.getElementById('yesDelete');
    const noBtn = document.getElementById('noDelete');
    yesBtn.addEventListener('click', () => {
      deletePostFire(postId).then(() => {
        closeModal(0);
      });
    });
    noBtn.addEventListener('click', () => {
      closeModal(0);
    });
  });
};

// Revisar likes usuario
const likesUser = (typeLike, userUid) => {
  if (Object.values(typeLike).includes(userUid)) {
    const indexLike = typeLike.indexOf(userUid);
    typeLike.splice(indexLike, 1);
  } else {
    typeLike.push(userUid);
  }
  return typeLike;
};

//  Likes
export const likesState = (e) => {
  const postId = e.target.dataset.id;
  const typeLike = e.target.dataset.name;
  let newArrayLikes;
  getPost(postId).then((doc) => {
    const docData = doc.data();
    const currentUser = currentUserConf();
    const userUid = currentUser.uid;
    const tasteLikesUsers = docData.tasteLikes;
    const cookLikesUsers = docData.cookLikes;
    if (typeLike === 'tasteLike') {
      newArrayLikes = likesUser(tasteLikesUsers, userUid);
      doc.ref.update({ tasteLikes: newArrayLikes });
    } else {
      newArrayLikes = likesUser(cookLikesUsers, userUid);
      doc.ref.update({ cookLikes: newArrayLikes });
    }
  });
};

//  Agregar comentarios
export const addComments = (e) => {
  const postId = e.target.dataset.id;
  const currentUser = currentUserConf();
  const addCommentTemplate = addComment(currentUser.photoURL, currentUser.displayName);
  modalPost(addCommentTemplate);
  getPost(postId).then((doc) => {
    const docData = doc.data();
    const commentsArray = docData.comments;
    const userCommentPhotos = docData.userCommentPhoto;
    const btnPost = document.getElementById('btnAddComment');
    btnPost.addEventListener('click', async () => {
      const commentPost = document.getElementById('postCommentText').value;
      if (commentPost !== '') {
        commentsArray.push(commentPost);
        userCommentPhotos.push(currentUser.photoURL);
        const modalPostCont = document.getElementById('postModal_container');
        modalPostCont.style.display = 'none';
        await doc.ref.update({ comments: commentsArray });
        await doc.ref.update({ userCommentPhoto: userCommentPhotos });
      } else {
        console.log('Debes colocar algo en el textarea');
      }
    });
  });
};

//   Girar imágenes
export const rotate = (e) => {
  const post = e.target;
  const parent = post.parentNode;
  if (parent.classList.contains('post-container')) {
    parent.classList.remove('post-container');
    parent.classList.add('post-container-turn');
  } else {
    parent.classList.remove('post-container-turn');
    parent.classList.add('post-container');
  }
};

//  Mostrar nás comentarios
export const showMoreComments = (e) => {
  const postIdInf = e.target.dataset.id;
  getPost(postIdInf).then((doc) => {
    console.log(doc.data());
    const docDataInf = doc.data();
    const postComments = docDataInf.comments;
    const userCommentPhotos = docDataInf.userCommentPhoto;
    document.getElementById(`post-FirstComment-container-${postIdInf}`).style.display = 'none';
    if (postComments.length !== 0) {
      postComments.forEach((comment, i) => {
        const commentContainer = document.getElementById(`post-comments-container_add-${postIdInf}`);
        commentContainer.innerHTML += commentsTemplate(userCommentPhotos, i, comment);
      });
    }
    document.getElementById(`post-lessComments-${postIdInf}`).style.display = 'flex';
  });
};

//  Ocultar comentarios
export const showLessComments = (e) => {
  const postIdInfo = e.target.dataset.id;
  document.getElementById(`post-FirstComment-container-${postIdInfo}`).style.display = 'flex';
  const commentContainer = document.getElementById(`post-comments-container_add-${postIdInfo}`);
  const commentsChilds = commentContainer.getElementsByClassName('post-indComment-container');
  Array.from(commentsChilds).forEach((element) => {
    element.remove();
  });
  document.getElementById(`post-lessComments-${postIdInfo}`).style.display = 'none';
};
