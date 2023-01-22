// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

const displayInfo = document.querySelector('#display-info');
const getMovies = document.querySelector('select');
const reviewForm = document.querySelector('form');
const getPeople = document.querySelector('#show-people');
const reviews = document.querySelector('#review');
const resetButton = document.querySelector('#reset-reviews');
const ul = document.querySelector('ul');
const ol = document.querySelector('ol');



function run() {
 // Add code you want to run on page load here

 fetch("https://resource-ghibli-api.onrender.com/films")
    .then(response => response.json())
    .then(movies => {
        console.log(movies);
    movies.forEach(movie => {
        let currMovie = document.createElement('option');
        currMovie.value = movie.title;
        currMovie.innerHTML = movie.title;
        getMovies.append(currMovie);

    getMovies.addEventListener('change', (e) => {
        if(e.target.value === currMovie.value) {
            displayInfo.innerHTML = '';
            
            const movieTitle = document.createElement('h3');
            const movieRelease = document.createElement('p');
            const movieDescription = document.createElement('p');

            movieTitle.textContent = `${movie.title}`;
            movieRelease.textContent = `${movie.release_date}`;
            movieDescription.textContent = `${movie.description}`;

            displayInfo.append(movieTitle, movieRelease, movieDescription);
            }
        });
    })

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const input = e.target.review.value;
        const li = document.createElement('li');

        let movies = getMovies.value;
        if(movies === '') {
            alert('Please select a movie first')
        } else {
            li.innerHTML = `<strong><b>${movies}</b></strong>: ${input}`
            ul.append(li);
            e.target.reset();
            }
        });
    })
    .catch(error => {
    console.log(error)
    });

    
    resetButton.addEventListener('click', (e) => {
        e.preventDefault();
        ul.innerHTML = '';
    });
}

function peopleNames() {
    fetch("https://resource-ghibli-api.onrender.com/people")
        .then(response => response.json())
        .then(data => {

            for(let i = 0; i < data.length; i++) {
                const peopleList = document.createElement('li');
                peopleList.innerHTML = data[i].name;
                ol.append(peopleList);
            }
        })
        .catch(error => {
            console.log(error)
        });
}
        getPeople.addEventListener('click', (e) => {
        e.preventDefault();
        peopleNames();
})

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
