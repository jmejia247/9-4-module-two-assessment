let dropdown = document.querySelector(".dropdown")

fetch (`https://resource-ghibli-api.onrender.com/films`).then(response => response.json()).then(data => {
    console.log(data.results)
    data.results.forEach
})