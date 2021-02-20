export const home = `
<header>
    <img class="chop"
      src="https://user-images.githubusercontent.com/75234502/106777987-1d77dc80-660b-11eb-8d01-191b02855d50.png"
      alt="">
    <div class ="tittle">
      <h1>¡Aprende, cocina y comparte!</h1>
      <p>Únete a nuestra comunidad y comparte tus mejores recetas</p>
      </div>
    <img  id="picture" class="perfil" src="https://www.softzone.es/app/uploads/2018/04/guest.png" alt="">
    <img id="btn-menu" class="menu" src="./icons/bars-solid.svg" alt="">
  </header>
  <nav>
    <img class="search" src="./icons/search-solid.svg" alt="">
    <img class="home" id="home" src="./icons/home-solid.svg" alt="">
    <img class="add" src="./icons/plus-circle-solid.svg" alt="">
  </nav>
  <div id="open" class="disable-menu-desplegable">
  <ul>
   <li id="profile"><a href= "#/profile/">Mi perfil</a></li>
    <li><a href = "#/posts/">Mis post</a></li>
    <li><a href= "#/favorites/">Mis likes</a></li>
    <li class="signOut">Salir</li>
  </ul>
</div>
<section>
  <article class="information-people">
    <figure>
      <img id ="perfil-desktop" src="https://www.softzone.es/app/uploads/2018/04/guest.png" alt="">
    </figure>
    <div class="people-datos">
      <h2 id ="name"></h2>
      <p id ="email"></p>
    </div>
    <ul class= "home-main-profile_options">
      <li><a href= "#/profile/">Mi perfil</a></li>
      <li><a href = "#/posts/">Mis post</a></li>
      <li><a href= "#/favorites/">Mis likes</a></li>
      <li class="signOut">Salir</li>
    </ul>
  </article>
  <article>
    <h2>post</h2>
  </article>
</section>
<div class="homeWelcome-modal_container" id="homeWelcome-modal_container">
  <div class="homeWelcome-modal" id= "homeWelcome-modal">
    <figure class="close">
      <img src= "https://user-images.githubusercontent.com/75234502/108016913-3acc8380-6fd9-11eb-84ba-297a450edb1f.png">
    </figure>
    <img src="https://user-images.githubusercontent.com/75234502/106777987-1d77dc80-660b-11eb-8d01-191b02855d50.png" alt="ícono-Chop">
    <div class="homeWelcome-modal_msg" id="homeWelcome-modal_msg"></div>
  </div>
</div>
`;
