const BASE_URL = 'https://resource-ghibli-api.onrender.com';
const FILM_URL = `${BASE_URL}/films/`;
const PEOPLE_URL = `${BASE_URL}`;

const movDrop = document.querySelector('.movie-drop select');
const movRevEnter = document.querySelector('.review-enter form');
const movDetails = document.querySelector('.movie-details div');
const movPeople = document.querySelector('.people ol');
const movPeopleButt = document.querySelector('#show-people');
const movReview = document.querySelector('#reviews ul');
const movReviewReset = document.querySelector('#reset-reviews');

// FETCH
fetch(FILM_URL)
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data);
        getMovieTitles(data);

    });

// Get Movie Titles Function
function getMovieTitles(data) {
    for (let movie of data) {
        let newMovOption = document.createElement('option');
        newMovOption.value = movie.id;
        newMovOption.innerText = movie.title;
        movDrop.append(newMovOption);
    }
};

// Movie Details Event Listener
movDrop.addEventListener('change', (event) => {
    event.preventDefault();
    // console.log(movDrop.value)

    movDetails.innerHTML = '';
    movPeople.innerHTML = '';
    let pickMovTitle = document.createElement('h3');
    let pickMovYear = document.createElement('p');
    let pickMovDet = document.createElement('p');
    if (movDrop.value) {
        fetch(`${FILM_URL}${movDrop.value}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                pickMovTitle.innerText = data.title;
                pickMovYear.innerText = data.release_date;
                pickMovDet.innerText = data.description;
                movDetails.append(pickMovTitle, pickMovYear, pickMovDet);
                // console.log(pickMovTitle);

                // Show People Event Listener
                movPeopleButt.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (!document.querySelector('#display-info').innerText) {
                        alert('Please select a movie first')
                    } else {
                        for (let person of data.people) {
                            let movPerson = document.createElement('li');
                            fetch(`${PEOPLE_URL}${person}`)
                                .then((resp) => resp.json())
                                .then((data) => {
                                    // console.log(data);
                                    movPerson.innerText = data.name;
                                    console.log(movPerson);
                                    movPeople.append(movPerson);
                                });
                        }
                    }
                })
            });

    } else {
        alert('Please select a movie title');
    };

});

// Movie Review Event Listener
movRevEnter.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!document.querySelector('#display-info').innerText) {
        alert('Please select a movie first')
    } else if (!document.querySelector('#review').value) {
        alert('Please enter your review')
    } else {
        let reviewContent = document.querySelector('#review').value;
        document.querySelector('#review').value = '';
        console.log(reviewContent);

        let newReviewTitle = document.querySelector('#display-info h3').innerText;
        let newReview = document.createElement('li');
        newReview.innerHTML = `<strong>${newReviewTitle}:</strong> ${reviewContent}`;
        movReview.append(newReview);

        movReviewReset.addEventListener('click', (event) => {
            event.preventDefault();
            movReview.innerHTML = '';
        })
    }
});







// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    // Add code you want to run on page load here


}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
