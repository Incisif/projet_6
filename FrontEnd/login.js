const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Function to handle the login process
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

        //sets the "token" key with the value of the token received from the API in the sessionStorage.
        sessionStorage.setItem("token",responseData.token);

    } catch (error) {
        console.error(error);
        alert("E-mail ou mot de passe incorrect");
    }
}

//When the login button is clicked, get the email and password and call the login function
document.forms[0].addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    if (email.trim === '' || !email.includes('@')) {
        alert("E-mail invalide");
        return;

    }
    if (password.trim === '') {
        alert("Veuillez entrer un mot de passe valide");
        return;
    }
    login(email, password);

});