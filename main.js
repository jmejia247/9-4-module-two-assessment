// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
const titles = document.querySelector('#titles');
const input = document.querySelector('#userInput');
const movieTitle = document.querySelector('#movie-title');
const releaseDate = document.querySelector('#release-date');
const description = document.querySelector('#description');
const contact = document.querySelector('#contact');
const form = document.querySelector('form');
const reviews = document.querySelector('#reviews');
const addReview = document.querySelector('#review');
const ownReview = document.querySelector('#ownReview');
const peopleShow = document.querySelector('#people-show');
const userData = document.querySelector('#userData');


function getAPI() {
    fetch('https://resource-ghibli-api.onrender.com/films')
    .then((response) => response.json())
    .then((response) => {
        response.forEach((movie)=> {
            let option = document.createElement('option');
            option.setAttribute('value', movie.id);
            option.innerHTML = movie.title;
            titles.append(option);
        });
    });
}

titles.addEventListener('change', () => {
    fetch(`https://resource-ghibli-api.onrender.com/films/${titles.value}`)
    .then((response) => response.json())
    .then((response) => {
        if (titles.value)
        movieTitle.innerHTML = response.title;
        releaseDate.innerHTML = response.release_date;
        description.innerHTML = response.description;
    });
});

contact.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!titles.value) {
        alert('Please select a movie first');
     }  else {
        let inputReview = document.createElement('li');
        inputReview.classList.add('inputReview')
        inputReview.innerHTML = `<b>${movieTitle.innerText}.</b>: ${addReview.value}`;
        ownReview.append(inputReview);
        form.reset()
     }
})

reviews.addEventListener('click', (e) => {
    e.preventDefault();
    const allReviews = document.querySelectorAll('.inputReview');
    allReviews.forEach((li) => {
        li.remove()
    })
})

userData.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('https://resource-ghibli-api.onrender.com/people')
    .then((response) => response.json())
    .then((response) => {
        let people = response.filter((person) => {
            return (person.id = titles.value);
        });
        people.forEach((person) => {
            let name = document.createElement('li');
            name.innerHTML = person.name
            peopleShow.append(name)
        })
    })
})

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(getAPI, 1000);
