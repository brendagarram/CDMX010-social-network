import { showModals } from './showModals.js';
import { editProfileModal } from './modales.js'
//  Info perfil
export const getUserData = () => {
  const userImage = document.getElementById('header-home_goToProfile');
  const userName = document.getElementById('header-profileInfo_name');
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var user = firebase.auth().currentUser;
      let photo = user.photoURL;
      let name = user.displayName;
      let email = user.email;
      console.log(photo);
      userName.textContent = name;
      if (window.location.hash === '#/profile/') {
        const userEmailContainer = document.getElementById('header-profileInfo_email');
        userEmailContainer.textContent = email;
      };
      if(photo != null) {
        userImage.src = photo;
      } else {
        userImage.src = 'https://user-images.githubusercontent.com/75234502/108898773-3c033f00-75dd-11eb-9af9-8cfdffcff204.png';
      }
    }
  });
};

//  Editar perfil
export const editProfile = () => {
  let imgURL;
  const editBtn = document.getElementById('header-profile_editProfile');
  editBtn.addEventListener('click', () => {
    showModals(editProfileModal);
    let user = firebase.auth().currentUser;
    const buttonEdit = document.getElementById('saveEdit');
    let file = document.getElementById('file');
    file.addEventListener('change', () => {
      let imgFile = document.getElementById("file").files[0];
      const previewImg = document.getElementById('imgLoad');
      imgURL = URL.createObjectURL(imgFile);
      previewImg.src = imgURL;
      });
    buttonEdit.addEventListener('click', () => {
      let nameProfile = document.getElementById('nameProfInput').value;
      let imgFile = document.getElementById("file").files[0];
      if (nameProfile === '') {
        nameProfile = user.displayName;
        console.log('Igual')
      } else if (nameProfile != ''){
        nameProfile = nameProfile;
      }
      updateProfile(imgFile, nameProfile, imgURL);
      })
  })
}

// Actualizar perfil
const updateProfile = (img, name) => {
  let storageRef = storage.ref('/userProfileImgs/' + img.name);
  storageRef.put(img).then (function(snapshot) {
    storageRef.getDownloadURL().then(function (url) {
      let user = auth.currentUser;
      user.updateProfile({
        photoURL: url,
        displayName: name,
      }).then(function(result) {
        let imgProf = document.getElementById('header-home_goToProfile');
        imgProf.src = img;
        let nameDiv = document.getElementById('header-profileInfo_name');
        let name = user.displayName;
        nameDiv.textContent = name;
        const close = document.getElementsByClassName("close")[0];
        close.onclick();
        window.location.reload();
      }).catch(function(error) {
      });
    });
  })
};