export const signUp = `
<div class= "homeWelcome-info-container">
    <div class= "homeWelcome-info-container--background">
        <div class= "homeWelcome-header-container">
            <figure class= "homeWelcome-header-container_chop">
                <img src="https://user-images.githubusercontent.com/75234502/106777987-1d77dc80-660b-11eb-8d01-191b02855d50.png" alt="">
            </figure>
            <p class= "homeWelcome-header_slogan">¡Aprende, cocina y comparte!</p>
            <p class= "homeWelcome-header_invitation">Únete a nuestra comunidad y comparte tus mejores recetas</p>
        </div>
        <div class= "homeWelcome-main-container" id= ".homeWelcome-main-formSignUp-container">
            <figure class= "homeWelcome-main-container_chop">
                <img src="https://user-images.githubusercontent.com/75234502/106777987-1d77dc80-660b-11eb-8d01-191b02855d50.png" alt="">
            </figure>
            <div class= "homeWelcome-main-formSignUp-container">
                <p> Únete ahora </p> <br>
                <form action="#" onsubmit="return false" name="signUpForm" class= "homeWelcome-main-form">
                    <label for="userName">Escribe tu nombre</label>
                    <input type="text" name="signUpName" id="userName" placeholder= Nombre de usuario required>
                    <label for="signUpEmail">Escribe tu correo</label>
                    <input type="email" name= "signUpEmail" id= "signUpEmail" placeholder= Email required>
                    <div class= "signUpPassword-container">
                        <label for="signUpPassword">Escribe tu contraseña</label>
                        <input type="password" name= "signUpPassword" id= "signUpPassword" placeholder= Password required>
                        <span></span>
                    </div>
                    <div class= "signUpPasswordConfirm-container">
                        <label for="signUpPasswordConfirm">Confirma tu contraseña</label>
                        <input type="password" name= "signUpPasswordConfirm" id= "signUpPasswordConfirm" placeholder= Password required>
                        <span></span>
                    </div>
                    <div class= "error-message_container" id="error-message_container">
                        <figure>
                            <img src="https://user-images.githubusercontent.com/75234502/108790177-a9619200-7541-11eb-85e1-09a9e72fc1ea.png" alt="warning-logo">
                        </figure>
                        <p id="error-message"></p>
                    </div>
                    <input class="signUpButton" id="signUpButton" type= "submit" href="#/">
                </form>
            </div>
        </div>
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
</div>
`;
