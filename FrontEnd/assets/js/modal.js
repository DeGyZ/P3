
// Modal //
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Fin modal //

// Afficher les travaux dans modal //

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
        let remove = document.createElement("i")
        remove.classList.add("test")
        remove.classList.add("fa-solid")
        remove.classList.add("fa-trash-can")
        figure.appendChild(remove)
        figure.appendChild(image)
        figure.appendChild(figcaption)
        galleryTwo.appendChild(figure)

    }

}
displayWorksTwo()
