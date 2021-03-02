import { db } from './firebase.js';

const createPost = `
<div>
  <div id="newPost">
    <h6>Comparte tus hallazgos:</h6>
      <input type="text" placeholder="Título de la publicación" id="title"></input>
      <textarea placeholder="Subtítulo" id="subtitle"></textarea>
      <textarea placeholder="Cuerpo de la publicación" id="body"></textarea>
      <button id="saveButton">Publicar</button>
  </div>
</div>

<div id="printData">
</div>
`;

// Renderiza la tarjeta de la publicación en el muro.
export const renderPost = (param) => `
<div>
  <div id="cardContainer" id ="link">
    <h2 id="cardTitle">${param.Title}</h2><img id="authorAvatar" class="icons" src="resources/user.png" alt="authorAvatar">
    <h3 id"cardSubtitle">${param.Subtitle}</h3>
    <p id="renderBody">${param.Body}</p>
    <img id="readingTime" class="icons" src="resources/clock.png" alt="readingTime">
    </div>
</div>
`;

const showingPost = (postContainer) => {
  db.collection('newPost')// .orderBy('fecha')
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const dataBase = doc.data();
        // eslint-disable-next-line no-param-reassign
        postContainer.innerHTML += renderPost(dataBase);
        console.log(dataBase);
      });
    });
};

export const home = (container) => {
  const html = `
    <div id="header">
        <img id="snipple" src="resources/garabato.png" alt="logo" class= "link">
        <img id="userAvatar" class="link" src="resources/user.png" alt="genericAvatar">
        <img id="searchIcon" class="link" src="resources/search.png" alt "searchIcon">
    </div>

    <h1>¡Hola Elena!</h1>

    ${createPost}
    
    <div id="container2"></div>
  `;

  // eslint-disable-next-line no-param-reassign
  container.innerHTML = html;
  showingPost(container);
};
