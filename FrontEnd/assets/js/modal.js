
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
let back = document.querySelector(".fa-arrow-left")
let addContent = document.querySelector(".addContent");
let contentGallery = document.querySelector(".contentGallery");
let contentFormulaire = document.querySelector(".contentFormulaire");
let faImage = document.querySelector(".fa-image");
let pForm = document.querySelector(".pForm");
let imgInput = document.querySelector(".imgInput");
let imageInput = document.getElementById('imageInput');
let previewImage = document.getElementById('previewImage');

// Apparition modale + déplacements à l'intèrieur

btn.onclick = function() {
  modal.style.display = "block";
  back.classList.add("caché");
  back.classList.remove("pasCaché");
  contentFormulaire.classList.add("caché");
  contentFormulaire.classList.remove("pasCaché");
}

btn.addEventListener("click", function() {
    modal.style.display = "block";
    back.classList.add("hidden");
    back.classList.remove("visible");
    contentFormulaire.classList.add("hidden");
    contentFormulaire.classList.remove("visible");
})

addContent.addEventListener('click', () => {
  contentGallery.classList.add("hidden");
  contentGallery.classList.remove("visible");
  back.classList.remove("hidden");
  back.classList.add("visible");
  contentFormulaire.classList.add("visible");
  contentFormulaire.classList.remove("hidden");
})

back.addEventListener('click', () =>{
  contentFormulaire.classList.add("hidden");
  contentFormulaire.classList.remove("visible");
  back.classList.add("hidden");
  back.classList.remove("visible");
  contentGallery.classList.add("visible");
  contentGallery.classList.remove("hidden");
})

span.addEventListener('click', closeModal);

window.onclick = function() {
  if (event.target == modal) {
    modal.style.display = "none";
    contentGallery.classList.add("visible");
    contentGallery.classList.remove("hidden");
    back.classList.remove("visible");
    back.classList.add("visible");
    contentFormulaire.classList.add("hidden");
    contentFormulaire.classList.remove("visible");
  }
}

// Affichage des travaux 

const displayWorksTwo = async () =>{
    await fetchWorks()
    //nettoyage de la galerie pour éviter les doublons
    galleryTwo.innerHTML = ""
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
        let move = document.createElement("div")
        move.classList.add("moveOn")
        move.classList.add("fa-solid")
        move.classList.add("fa-arrows-up-down-left-right")
        figure.addEventListener('mouseenter', () => {
          move.classList.add("visible")
        })
        figure.addEventListener('mouseleave', () => {
          move.classList.remove("visible")
        })
        let remove = document.createElement("div")
        remove.classList.add("test")
        remove.classList.add("fa-solid")
        remove.classList.add("fa-trash-can")
        remove.addEventListener('click', () => {
          fetch(`http://localhost:5678/api/works/${work.id}`, {
            method:"DELETE",
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              "accept":"*/*",
              "authorization":`Bearer ${token}`
            } 
          }) 
          .then(() => {
              displayWorks()
              displayWorksTwo()
          })
        })
        figure.appendChild(move)
        figure.appendChild(remove)
        figure.appendChild(image)
        figure.appendChild(figcaption)
        galleryTwo.appendChild(figure)
    }
}
displayWorksTwo()

// Affichage des catégories dans le formulaire

imageInput.addEventListener('change', function() {
  let file = this.files[0];
  let reader = new FileReader();

  reader.onload = function(e) {
      previewImage.src = e.target.result;
  }

  reader.readAsDataURL(file);
  previewImage.classList.remove("hidden")
  faImage.classList.add("hidden")
  imgInput.style.display = "none";
  pForm.classList.add("hidden")
});

// Affichage des catégories dans le formulaire

async function displayCategoriesTwo() {
  await fetchWorks()
  await fetchCategories()

  for (let category of categories) {
      let optionForm = document.createElement("option")
      optionForm.value = category.id
      optionForm.innerText = category.name
      selectId.appendChild(optionForm)
  }
}
displayCategoriesTwo()

// Validation du formulaire

let formValidButton = document.querySelector(".formValid");
formValidButton.addEventListener('click', (event) => {
event.preventDefault();
event.stopPropagation();

let title = document.querySelector("#workName").value;
let category = document.querySelector("#select").value;
let image = document.querySelector("#previewImage").src;

 if (title === '') {
    alert("Veuillez saisir un titre pour votre travail.");
    return;
  }

  if (image === 'http://127.0.0.1:5500/P3/FrontEnd/index.html#') {
    alert("Veuillez sélectionner une image pour votre travail.");
    return;
  } 
  let imageInput = document.querySelector("#imageInput")
  
  let formData = new FormData();
  formData.append("title", title);
  formData.append("image", imageInput.files[0]);
  formData.append("category", category);

  fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {
      "authorization":`Bearer ${token}`
    },
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      alert("Erreur lors de l'ajout de votre travail")
    } else {
      displayWorks()
      displayWorksTwo()
      .then(() => modal.style.display = "none")

      //nettoyage champ image
      previewImage.classList.add("hidden")
      faImage.classList.remove("hidden")
      imgInput.style.display = "flex";
      pForm.classList.remove("hidden")

      //nettoyage modal
      closeModal()
    }
  }) 
  
});

function closeModal () {
  modal.style.display = "none";
  contentGallery.classList.add("visible");
  contentGallery.classList.remove("hidden");
  back.classList.remove("visible");
  back.classList.add("hidden");
  contentFormulaire.classList.add("hidden");
  contentFormulaire.classList.remove("visible");
}