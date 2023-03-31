const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");

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

       

        
    } catch (error) {
        console.error(error);
        alert("E-mail ou mot de passe incorrect");
    }
}

loginButton.addEventListener("click", () => {

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