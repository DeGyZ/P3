let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
let back = document.querySelector(".fa-arrow-left")
let ajouter = document.querySelector(".ajouter");
let contentGallery = document.querySelector(".contentGallery")
let contentFormulaire = document.querySelector(".contentFormulaire")


btn.onclick = function() {
  modal.style.display = "block";
  back.classList.add("caché");
  back.classList.remove("pasCaché");
  contentFormulaire.classList.add("caché");
  contentFormulaire.classList.remove("pasCaché");
}

ajouter.addEventListener('click', () => {
  contentGallery.classList.add("caché");
  contentGallery.classList.remove("pasCaché");
  back.classList.remove("caché");
  back.classList.add("pasCaché");
  contentFormulaire.classList.add("pasCaché");
  contentFormulaire.classList.remove("caché");
})

back.addEventListener('click', () =>{
  contentFormulaire.classList.add("caché");
  contentFormulaire.classList.remove("pasCaché");
  back.classList.add("caché");
  back.classList.remove("pasCaché")
  contentGallery.classList.add("pasCaché")
  contentGallery.classList.remove("caché")
})

span.onclick = function() {
  modal.style.display = "none";
  contentGallery.classList.add("pasCaché");
  contentGallery.classList.remove("caché");
  back.classList.remove("pasCaché");
  back.classList.add("caché");
  contentFormulaire.classList.add("caché");
  contentFormulaire.classList.remove("pasCaché");
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    contentGallery.classList.add("pasCaché");
    contentGallery.classList.remove("caché");
    back.classList.remove("pasCaché");
    back.classList.add("pasCaché");
    contentFormulaire.classList.add("caché");
    contentFormulaire.classList.remove("pasCaché");
  }
}

console.log(sessionStorage.getItem("Token"))

const displayWorksTwo = async () =>{
    await fetchWorks()
    
    for(let work of works){
        let figure = document.createElement("figure")
        figure.setAttribute("data-categoryId", work.categoryId)
        figure.setAttribute("class", "display")
        figure.classList.add("testParent")
        let image = document.createElement("img")
        image.setAttribute("src",work.imageUrl)
        image.setAttribute("alt",work.title)
        let figcaption = document.createElement("figcaption")
        figcaption.innerText = "éditer"
        let remove = document.createElement("div")
        remove.classList.add("test")
        remove.classList.add("fa-solid")
        remove.classList.add("fa-trash-can")
        remove.addEventListener('click', () => {
          console.log(token)
          fetch(`http://localhost:5678/api/works/${work.id}`, {
            method:"DELETE",
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              "accept":"*/*",
              "authorization":`Bearer ${token}`
            } 
          }) 
          .then(response => console.log(response.status))
          console.log(work.id)
        })

        figure.appendChild(remove)
        figure.appendChild(image)
        figure.appendChild(figcaption)
        galleryTwo.appendChild(figure)
    }
}
displayWorksTwo()

