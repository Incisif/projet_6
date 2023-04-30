const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("login-message");

function hideMessage() {
    message.innerHTML = "";
}

/**
Logs in a user by sending a POST request to the login API endpoint with the provided email and password.
If the request is successful, the user is redirected to the index page and a token is stored in the session storage.
If the request fails, an error message is displayed on the login page.
@async
@function
@param {string} email - The email of the user.
@param {string} password - The password of the user.
@returns {void}
*/
async function login(email, password) {
    const user = { email, password };
    try {
        let response = await fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)

        });

        if (!response.ok) {
            throw new Error("Erreur lors de la connexion");
        }
        const responseData = await response.json();
        console.log("Connexion réussie", responseData);
        window.location.replace("index.html");
        sessionStorage.setItem("token", responseData.token);

    } catch (error) {
        console.error(error);
        message.innerHTML = "E-mail ou mot de passe incorrect";
        setTimeout(hideMessage, 3000);
    }
}

//When the login button is clicked, get the email and password and call the login function
document.forms[0].addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;


    if (email.trim === '' || !email.includes('@')) {
        message.innerHTML = "E-mail invalide";
        setTimeout(hideMessage, 3000);
        return;

    }
    if (password.trim === '') {
        message.innerHTML = "Veuillez entrer un mot de passe valide";
        setTimeout(hideMessage, 3000);
        return;
    }
    login(email, password);

});