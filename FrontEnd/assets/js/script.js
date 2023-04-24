let works = []
let categories = []
let all = []
let filters = document.querySelector(".filters")
let gallery = document.querySelector("#portfolio .gallery")
let galleryTwo = document.querySelector(".galleryTwo")
const fetchWorks = async () =>{
    await  fetch("http://localhost:5678/api/works")
    .then((response)=>response.json()) 
    .then((worksResponse)=>{
        // console.log(worksResponse)
        works = worksResponse
    })
    .catch(error => console.log(error))
}

const fetchCategories = async () =>{
    await fetch('http://localhost:5678/api/categories')
    .then((response)=>response.json())
    .then((categoriesResponse)=>{
        // console.log(categoriesResponse)
        categories = categoriesResponse

    })
    .catch(error => console.log(error))
}

const displayWorks = async () =>{
    await fetchWorks()
    
    for(let work of works){
        let figure = document.createElement("figure")
        figure.setAttribute("data-categoryId", work.categoryId)
        figure.setAttribute("class", "display")
        let image = document.createElement("img")
        image.setAttribute("src",work.imageUrl)
        image.setAttribute("alt",work.title)
        let figcaption = document.createElement("figcaption")
        figcaption.innerText = work.title
        figure.appendChild(image)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
    }
}
displayWorks()

async function displayCategories() {
    await fetchWorks()
    await fetchCategories()
    console.log(categories)

    categories.unshift({name:"Tous"})

    for (let category of categories) {
        let button = document.createElement("button")
        button.innerText = category.name
        filters.appendChild(button)
        button.addEventListener("click", function (event) {
            let figures = document.querySelectorAll(".gallery figure")
            for (let figure of figures) {
                console.log(category.id)
                if (category.id !== undefined){
                    if (parseInt(figure.getAttribute("data-categoryId")) === category.id) {
                        figure.classList.replace("hidden", "display")
                    } else {
                        figure.classList.replace("display", "hidden")
                    }
                } else {
                    figure.classList.replace("hidden", "display")
                }
                
            }
        })
    }
}
displayCategories()



console.log(sessionStorage.getItem("Token"))
console.log(sessionStorage.getItem("isLoggedIn"))


