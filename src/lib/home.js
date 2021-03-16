export const home = `
<header class= "home-header">
    <nav>
      <figure class="header-nav_iconChop">
        <img id = "header-home_goToHome" src="https://user-images.githubusercontent.com/75234502/106777987-1d77dc80-660b-11eb-8d01-191b02855d50.png" alt="Chop icon">
      </figure>
      <div class = "header-nav_container">
        <div class = "header_profileInfo_container">
          <figure class="header-nav_profileImg">
            <img id = "header-home_goToProfile" src="https://www.softzone.es/app/uploads/2018/04/guest.png" alt="profile-img">
          </figure>
          <p id= "header-profileInfo_name">Nombre</p>
        </div>
        <figure class= "header-nav_menuIcon-container">
          <img class= "header-nav_menuIcon" id="btn-menu" src="https://user-images.githubusercontent.com/75234502/108650846-1e6f9180-7486-11eb-96ff-7dfac71aec8e.png" alt="menu icon">
        </figure>
      </div>
    </nav>
  </header>
  <div id= "home-post-container" class= 'home-post-container'>
  </div>
  <div id="menu-open" class="disable-menu-desplegable">
    <ul>
      <li id="aboutUs"><a href= "#/aboutUs/">Conócenos</a></li>
      <li id="myFavorites"><a href= "#/favoritePost/">Favoritos</a></li>
      <li class="signOut" id="signOut"><a>Salir</a></li>
    </ul>
  </div>
  <div class="homeWelcome-modal_container" id="homeWelcome-modal_container">
    <div class="homeWelcome-modal" id= "homeWelcome-modal">
      <figure class="close">
        <img src= "https://user-images.githubusercontent.com/75234502/108016913-3acc8380-6fd9-11eb-84ba-297a450edb1f.png">
      </figure>
      <img src="https://user-images.githubusercontent.com/75234502/106777987-1d77dc80-660b-11eb-8d01-191b02855d50.png" alt="ícono-Chop">
      <div class="homeWelcome-modal_msg" id="homeWelcome-modal_msg"></div>
    </div>
  </div>
  <div class="postModal_container" id="postModal_container">
    <div class= "postModalInfo" id= "postModalInfo">
    </div>
  </div>
`;
