let email = document.getElementById('email')
let erreurEmail = document.getElementById('erreurEmail')
const regexEmail = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm
let password = document.getElementById('password')
let loginForm = document.getElementById('loginForm')
let responseErreur = document.getElementById('responseErreur')

loginForm.addEventListener('click', (event) =>{
    event.preventDefault()
    event.stopPropagation()
    let validation = 0

    if(email.value === "" ){
        email.style.border = "2px solid red"
        erreurEmail.innerText = "Ce champ ne doit pas être vide"
    } else if (regexEmail.test(email.value) === false){
        email.style.border = "2px solid red"
        erreurEmail.innerText = "Cet E-mail n'est pas valide."
    } else {
        email.style.border = "2px solid green"
        erreurEmail.innerText = ""
        validation++
    }
    


    if(validation < 1){
        console.log(email)
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify({email:email.value, password:password.value})
        })
        .then((response) => {
            console.log(response.status)
            if(response.status !== 200){
                responseErreur.innerText = "Identifiants ou mot de passe incorrect"
            } else{
                let isLoggedIn = true
                let token = response.token
                sessionStorage.setItem("isLoggedIn", isLoggedIn)
                sessionStorage.setItem("Token", token)
                // location.assign("index.html") 
            }
        })     
    }

})


   


