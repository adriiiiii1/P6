
document.addEventListener('DOMContentLoaded', function () {
  console.log("login.js DOMContentLoaded");
  // Récupérer le formulaire et les champs d'entrée
  const formLogin = document.getElementById("form-login");
  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');
  const connexionBanner = document.getElementById('connexionBanner');

  formLogin.addEventListener("submit", function (event) {
    event.preventDefault(); // empechrr le rechargement de la page


    const email = emailInput.value;
    const password = passwordInput.value;


    const loginData = {
      email: email,
      password: password
    };

    //   requete POST vers l'API
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    })
      .then(response => {
        // Vérifier si la réponse est OK
        if (!response.ok) {
          // Gérer les erreurs HTTP
          throw new Error("Erreur HTTP : " + response.status);
        }
        return response.json();
      })
      .then(data => {
        // Connexion réussie
        const token = data.token; // récupérer le token
        localStorage.setItem('token', token);
        console.log("Connexion réussie :", data);
        window.location.href = "index.html";
    })
      .catch(error => {
        // gerer les erreurs
        console.error("Erreur de connexion :", error.message);
        afficherErreur("Utilisateur non reconnu");
      });
  });

  function afficherErreur(message) {
    const divErreur = document.createElement("div");
    divErreur.style.color = "red";
    divErreur.innerText = message;

    formLogin.appendChild(divErreur);

    // Supprimer la div erreur apres un certain temps
    setTimeout(() => {
      formLogin.removeChild(divErreur);
    }, 7000); // 7 sec
  }
});