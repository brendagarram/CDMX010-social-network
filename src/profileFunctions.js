import { showModals } from './showModals.js';
import { editProfileModal } from './modales.js';
import {
  currentUserConf, storageRef, putImgStorage, upDateUser, getDownloadURL,
} from './userFireBase.js';
import { previewImg } from './others.js';
//  Info perfil
export const getUserData = () => {
  const userImage = document.getElementById('header-home_goToProfile');
  const userName = document.getElementById('header-profileInfo_name');
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let photo;
      if (user.photoURL === null) {
        photo = 'https://www.softzone.es/app/uploads/2018/04/guest.png';
      } else {
        photo = user.photoURL;
      }
      upDateUser(user, {
        name: user.displayName,
        img: photo,
        email: user.email,
      });
      const name = user.displayName;
      const email = user.email;
      userName.textContent = name;
      if (window.location.hash === '#/profile/') {
        const userEmailContainer = document.getElementById('header-profileInfo_email');
        userEmailContainer.textContent = email;
      }
      userImage.src = photo;
    }
  });
};

// Actualizar perfil
const updateProfile = (img, names, user) => {
  //  Referencia a la carpeta en el storage de firebase(carpeta y nombre del archivo)
  const storageReference = storageRef('/userProfileImgs/', user.uid);
  putImgStorage(storageReference, img)
    .then(() => {
      getDownloadURL(storageReference)
        .then((result) => {
          upDateUser(user, {
            name: names,
            img: result,
          }).then(() => {
            const imgProf = document.getElementById('header-home_goToProfile');
            imgProf.src = result;
            const nameDiv = document.getElementById('header-profileInfo_name');
            const nameUser = user.displayName;
            nameDiv.textContent = nameUser;
            const close = document.getElementsByClassName('close')[0];
            close.onclick();
            window.location.reload();
          }).catch((error) => {
            console.log(error);
            console.log('No actualización');
          });
        })
        .catch((error) => {
          console.log(error);
          console.log('No url');
        });
    })
    .catch((error) => {
      console.log(error);
      console.log('No se subió img');
    });
};

//  Editar perfil
export const editProfile = () => {
  const editBtn = document.getElementById('header-profile_editProfile');
  editBtn.addEventListener('click', () => {
    showModals(editProfileModal);
    const user = currentUserConf();
    const buttonEdit = document.getElementById('saveEdit');
    previewImg('file', 'imgLoad');
    buttonEdit.addEventListener('click', () => {
      let nameProfile = document.getElementById('nameProfInput').value;
      const imgFile = document.getElementById('file').files[0];
      if (nameProfile === '') {
        nameProfile = user.displayName;
      } else if (nameProfile !== '') {
        nameProfile = nameProfile;
      }
      updateProfile(imgFile, nameProfile, user);
    });
  });
};
