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
const movImage = document.querySelector('.movie-img');

function getMovieTitles(data) {
    for (let movie of data) {
        let newMovOption = document.createElement('option');
        newMovOption.value = movie.id;
        newMovOption.innerText = movie.title;
        movDrop.append(newMovOption);
    }
};

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    // Add code you want to run on page load here

    // FETCH
    fetch(FILM_URL)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            getMovieTitles(data);
        });
};

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
// Get Movie Titles Function

// Movie Details Event Listener
movDrop.addEventListener('change', (event) => {
    event.preventDefault();
    console.log(movDrop.value)

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
                movImage.src = data.image;
                movImage.alt = `${data.title} poster`;
                movImage.style.display = 'block';
                pickMovYear.innerText = data.release_date;
                pickMovDet.innerText = data.description;

                movDetails.append(pickMovTitle, pickMovYear, pickMovDet);
                // movDetails.after(movImage);
                // console.log(pickMovTitle);

                // I originally placed my event listener for the show people button within my code which was looking for a movie title selection and filled in the movie details.  I had to backtrack this idea bc it was creating duplicate event listeners on the same button, which was leading to incorrect SHOW PEOPLE data.  
            });
    } else {
        alert('Please select a movie first');
        console.log(alert('Please select a movie first'));
    };

});

// Movie Review Event Listener
movRevEnter.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!document.querySelector('#display-info').innerText) {
        alert('Please select a movie title')
        console.log(alert('Please select a movie title'))
    } else if (!document.querySelector('#review').value) {
        alert('Please enter your review')
    } else {
        let reviewContent = document.querySelector('#review').value;
        document.querySelector('#review').value = '';
        // console.log(reviewContent);
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

// Show People Event Listener

movPeopleButt.addEventListener('click', (event) => {
    event.preventDefault();
    fetch(`${FILM_URL}${movDrop.value}`)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);

            if (!document.querySelector('#display-info').innerText) {
                alert('Please select a movie first')
            } else {
                for (let person of data.people) {
                    movPeople.innerHTML = '';

                    let movPerson = document.createElement('li');
                    fetch(`${PEOPLE_URL}${person}`)
                        .then((resp) => resp.json())
                        .then((data) => {
                            // console.log(data);
                            if (data.name !== undefined) {
                                movPerson.innerText = data.name;
                                console.log(movPerson);
                                movPeople.append(movPerson);
                            } else {
                                movPerson.innerText = 'This movie has no people listed';
                                console.log(movPerson);
                                movPeople.append(movPerson);
                            };
                        });
                }
            }
        });
})
