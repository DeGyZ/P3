let works = []
let gallery = document.querySelector("#portfolio .gallery")
const fetchWorks = async () =>{
    await  fetch("http://localhost:5678/api/works")
    .then((response)=>response.json()) 
    .then((worksResponse)=>{
        console.log(worksResponse)
        works = worksResponse
    })
    .catch()
}
const displayWorks = async () =>{
    await fetchWorks()
    
    for(let work of works){
        let figure = document.createElement("figure")
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
fetch('http://localhost:5678/api/categories')
.then((response)=>response.json())
.then((categories)=>{
    console.log(categories)

})
