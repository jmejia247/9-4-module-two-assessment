// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
const titles = document.querySelector('#titles');
const input = document.querySelector('#userInput');
const movieTitle = document.querySelector('#movie-title');
const releaseDate = document.querySelector('#release-date');
const description = document.querySelector('#description');
const contact = document.querySelector('#contact');
const form = document.querySelector('#form');
const reviews = document.querySelector('#reviews');
const addReview = document.querySelector('#review');
const ownReview = document.querySelector('#ownReview');
const peopleShow = document.querySelector('#people-show');
const userData = document.querySelector('#userData');


function getAPI() {
    fetch('https://resource-ghibli-api.onrender.com/films')
    .then((response) => response.json())
    .then((response) => {
        console.log(response)
        response.forEach((movie)=> {
            let option = document.createElement('option');
            option.setAttribute('value', movie.id);
            option.innerHTML = movie.title;
            titles.append(option);
        });
    });
}

titles.addEventListener('change', (event) => {
    fetch(`https://resource-ghibli-api.onrender.com/films/${titles.value}`)
    .then((response) => response.json())
    .then((response) => {
        if(titles.value)
        movieTitle.innerHTML = response.title;
        releaseDate.innerHTML = response.release_Date;
        description.innerHTML = response.description;
    });
});

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(getAPI, 1000);
