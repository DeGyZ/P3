
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

btn.onclick = function() {
  modal.style.display = "block";
  back.classList.add("hidden");
  back.classList.remove("visible");
  contentFormulaire.classList.add("hidden");
  contentFormulaire.classList.remove("visible");
}

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

span.onclick = function() {
  modal.style.display = "none";
  contentGallery.classList.add("visible");
  contentGallery.classList.remove("hidden");
  back.classList.remove("visible");
  back.classList.add("hidden");
  contentFormulaire.classList.add("hidden");
  contentFormulaire.classList.remove("visible");
}

window.onclick = function(event) {
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

async function displayCategoriesTwo() {
  await fetchWorks()
  await fetchCategories()
  console.log(categories)

  for (let category of categories) {
      let optionForm = document.createElement("option")
      optionForm.value = category.id
      optionForm.innerText = category.name
      selectId.appendChild(optionForm)
  }
}
displayCategoriesTwo()

let formValidButton = document.querySelector(".formValid");
formValidButton.addEventListener('click', (event) => {
  event.preventDefault();

  let title = document.querySelector("#workName").value;
  let categoryId = document.querySelector("#select").value;
  let imageUrl = document.querySelector("#previewImage").src;
  
  console.log(title)
  console.log(imageUrl)
  console.log(categoryId)

  let formData = new FormData();
  formData.append('title', title);
  formData.append('imageUrl', imageUrl);
  formData.append('categoryId', categoryId);

  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'authorization':`Bearer ${token}`
    },
    body: formData
  })
  .then(response => {
    if (response.ok) {
      window.location.href = "index.html";
    } else {
      console.log(`Erreur lors de l'ajout du travail : ${response.status}`);
    }
  })
  .catch(error => console.error(`Erreur lors de l'envoi des données : ${error}`));
});