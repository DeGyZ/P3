let email = document.getElementById('email')
let erreurEmail = document.getElementById('erreurEmail')
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
let password = document.getElementById('password')
let loginForm = document.getElementById('loginForm')

// Connexion de l'utilisateur

const loginUser = async () => {
    await fetch ('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
        body: JSON.stringify({email:email.value, password:password.value})
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.error || data.message === "user not found") {
        let responseErreur = document.getElementById('responseErreur')
        responseErreur.innerText = "Identifiants ou mot de passe incorrect"
        return;
}
      let isLoggedIn = true
      let token = data.token
      sessionStorage.setItem("isLoggedIn", isLoggedIn)
      sessionStorage.setItem("Token", token)
      location.assign("index.html")       
    })
    }

// Vérification du formulaire de connexion + connexion

loginForm.addEventListener('submit', (event) =>{
    event.preventDefault()
    event.stopPropagation()
    let validation = 0

    if(email.value === "" ){
        email.style.border = "2px solid red"
        erreurEmail.innerText = "Ce champ ne doit pas être vide"
    } else if (email.value.match(regexEmail) === null){
        email.style.border = "2px solid red"
        erreurEmail.innerText = "Votre email n'est pas valide"
    } else {
        email.style.border = "2px solid green"
        erreurEmail.innerText = ""
        validation++
    }

    if(password.value === "" ){
        password.style.border = "2px solid red"
        erreurPassword.innerText = "Ce champ ne doit pas être vide"
    } else {
        password.style.border = "2px solid green"
        erreurPassword.innerText = ""
        validation++
    }
    
    if(validation === 2){
       loginUser()
}}

)
