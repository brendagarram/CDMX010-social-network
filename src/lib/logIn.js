export const logIn = `
    <div class= "homeWelcome-info-container">
        <div class= "homeWelcome-info-container--background">
            <div class= "homeWelcome-header-container">
                <figure>
                    <img src="https://user-images.githubusercontent.com/75234502/106777987-1d77dc80-660b-11eb-8d01-191b02855d50.png" alt="">
                </figure>
                <p class= "homeWelcome-header_slogan">¡Aprende, cocina y comparte!</p>
                <p class= "homeWelcome-header_invitation">Únete a nuestra comunidad y comparte tus mejores recetas</p>
            </div>
            <div class= "homeWelcome-main-container">
                <figure>
                    <img src="https://user-images.githubusercontent.com/75234502/106777987-1d77dc80-660b-11eb-8d01-191b02855d50.png" alt="">
                </figure>
                <div class= "homeWelcome-main-form-container">
                <p class="error--message" id="error--message">El usuario o contraseña son incorrectos, favor de verificarlos</p>
                    <form action="#" onsubmit="return false" name="logInForm" class= "homeWelcome-main-form">
                        <label for="logInEmail">Escribe tu correo</label>
                        <input type="email" name= "logInEmail" id= "logInEmail" placeholder= Email required>
                        <label for="logInPassword">Escribe tu contraseña</label>
                        <input type="password" name= "logInPassword" id= "logInPassword" placeholder= Password required>
                        <p id="error-verificacion">No has verificado tu correo</p>
                        <button class="signUpButton" id="logInButton" type= "submit" href="#/">Enviar</button>
                    </form>
                    <div class= "homeWelcome-main--icons-container">
                        <p>Acceder usando:</p>
                        <img id= "logInFacebook" src="https://user-images.githubusercontent.com/75234502/108005792-4b700000-6fbf-11eb-95d4-a1a9a07f45a6.png" alt="ícono Facebook">
                        <img id="logInGithub" src="https://user-images.githubusercontent.com/75234502/107734014-09df0c80-6cc2-11eb-8450-d9511e3d2e2e.png" alt="ícono Twitter">
                        <img id="logInGoogleButton"src="https://user-images.githubusercontent.com/75234502/108005686-f2a06780-6fbe-11eb-9510-602ec2fc4688.png" alt="ícono Gmail">
                    </div>
                    <p class= "homeWelcome-main--invitation">¿No eres miembro todavía?</p>
                    <a href="#/signup/" class= "homeWelcome-main--signUp" id= "logIn">Regístrate aquí</a>
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
