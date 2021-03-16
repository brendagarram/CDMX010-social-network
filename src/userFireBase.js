//  Autenticación con proveedor
export const authGitHub = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  const resultGitHub = firebase.auth().signInWithPopup(provider);
  return (resultGitHub);
};

export const authGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const resultGoogle = firebase.auth().signInWithPopup(provider);
  return (resultGoogle);
};

export const authFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  const resultFacebook = firebase.auth().signInWithPopup(provider);
  return (resultFacebook);
};

//  Autenticación email y password
export const logInEmailPass = (
  email, password,
) => firebase.auth().signInWithEmailAndPassword(email, password);

//  Crear usuario
export const createUser = (email,
  password) => firebase.auth().createUserWithEmailAndPassword(email, password);

//  Actualizar usuario
export const upDateUser = (user, { name, img, emailUser }) => {
  const newName = user.updateProfile({
    displayName: name,
    photoURL: img,
    email: emailUser,
  });
  return newName;
};

//  Enviar verificación por email
export const emailVerification = (user) => {
  const config = {
    url: 'http://localhost:5000/',
  };
  const emailVer = user.sendEmailVerification(config);
  return emailVer;
};

//  Verificar el usuario actual
export const currentUserConf = () => {
  const user = firebase.auth().currentUser;
  return user;
};

//  Confirmación de la verificación de usuario
export const emailVerified = (user) => {
  const emailVer = user.emailVerified;
  return emailVer;
};

//  Salir de la app
export const signOutFire = () => firebase.auth().signOut();

//  Perfil
//  Crear una referecia de firebase Storage
export const storageRef = (path, uid) => firebase.storage().ref(path + uid);
//  Crear una referecia de firebase Storage
//  export const storageRef = (path, img) => firebase.storage().ref(path + img.name);
//  Subir la imagen a esa referencia
export const putImgStorage = (reference, img) => reference.put(img);

//  Traer Url de la imagen
export const getDownloadURL = (reference) => reference.getDownloadURL();
//  Post
//  Crear una colección en firebase con los datos del post
export const postInfoPost = (uid, photo, usermail, name, post, tasteLikes,
  cookLikes, comments, userCommentPhoto, imgTasteLike,
  imgTasteNoLike, imgCookLike, imgCookNoLike, imgPost,
  date, dateMs, collectionName) => firebase.firestore().collection(collectionName).add({
  uid,
  photo,
  usermail,
  name,
  post,
  tasteLikes,
  cookLikes,
  comments,
  userCommentPhoto,
  imgTasteLike,
  imgTasteNoLike,
  imgCookLike,
  imgCookNoLike,
  imgPost,
  date,
  dateMs,
});

//  Guardar información del post
export const postData = (userUid, postId) => firebase.firestore().collection(userUid).add({
  postId,
});

//  Se hace una "captura" /snpashot/ de los contenidos de la colección hasta ese momento.
//  Ejecuta una función que se llama a sí misma
export const getPostInfo = (callbackFunction,
  collectionName) => firebase.firestore().collection(collectionName).orderBy('dateMs',
  'desc').onSnapshot(callbackFunction); //  onSnapshot es un controlador de instantáneas

//  Obtener el id de un post
export const getPost = (postId) => firebase.firestore().collection('posts').doc(postId).get();

//  Borrar post
export const deletePostFire = (postId) => firebase.firestore().collection('posts').doc(postId).delete();
