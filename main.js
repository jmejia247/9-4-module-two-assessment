





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here

let selectDrop = document.querySelector('.dropdown')
// fetch call to the api for all the films
fetch(`https://resource-ghibli-api.onrender.com/films`).then(response => response.json()).then(data => {
    //console.log(data)
// for each loop that looks through the whole object, and targets the name of the film
    data.forEach(films => {
// create an option element 
        let tag = document.createElement('option')
// set the text to the films title & the value of the option tag to the films id
        tag.innerText = films.title
        tag.value = films.id
        selectDrop.append(tag) 
     });
})



selectDrop.addEventListener("change", async (event) => {
    event.preventDefault()

//console.log(selectDrop.value)



fetch(`https://resource-ghibli-api.onrender.com/films/${selectDrop.value}`).then(response => response.json()).then(id => {
    console.log(id)

    const movieDetails = document.querySelector('#display-info')
    movieDetails.innerHTML = ""

    let title = document.createElement('h3')
    title.textContent = id.title
    movieDetails.append(title)

    let date = document.createElement('p')
    date.textContent = id.release_date
    movieDetails.append(date)

    let description = document.createElement('p')
    description.textContent = id.description
    movieDetails.append(description)

    const form = document.querySelector('form')
    const userInput = document.querySelector(".user-review")
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault()

    const li = document.createElement('li')

    li.innerHTML = 
    `<span><strong>${id.title}:</strong> ${event.target.review.value}</span>`
    
    userInput.append(li)

    document.getElementById('review').value = ""

    const people = document.querySelector('#show-people')
    const listNum = document.querySelector('ol')


    people.addEventListener('click', async (event) => {
        event.preventDefault()
        id.people.forEach(names => {

            const castName = document.createElement('li')
            castName.textContent = names

            listNum.append(castName)

        })
    })

    const clearReviews = document.querySelector('#reset-reviews')

    clearReviews.addEventListener('click', async (event) => {
        event.preventDefault()

        if(userInput){
            userInput.remove()
        }

    })

    })
})


})
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
