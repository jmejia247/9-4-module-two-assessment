





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
    const API_URL = 'https://resource-ghibli-api.onrender.com/films';
    fetch(API_URL).then(result => result.json()).then(films => {
        let titles = document.getElementById('titles');
        for(let i = 0; i < films.length; i++) {
            option = document.createElement('option');
            option.value = i;
            option.text = `${films[i].title}`;
            titles.appendChild(option);
        }
        titles.addEventListener('change', (event) => {
            fetch(API_URL).then(result => result.json()).then(films => {
                titles = document.getElementById('titles');
                const movieDetails = document.getElementById('movie_details');
                const displayInfo = document.getElementById('display-info');
                displayInfo.innerHTML = '';

                for (let i = 0; i < films.length; i++) {
                    if(titles.value == i){
                        
                        const defaultHeading = document.getElementById('default_heading');
                        // movieDetails.removeChild(defaultHeading);

                        const heading = document.createElement('h3');
                        heading.innerText = films[i].title;
                        displayInfo.appendChild(heading);

                        const releaseYear = document.createElement('p');
                        releaseYear.innerText = films[i].release_date;
                        displayInfo.append(releaseYear);

                        const description = document.createElement('p');
                        description.innerText = films[i].description;
                        displayInfo.append(description);    

                        document.querySelector('form').addEventListener('submit', (event) => {
                            event.preventDefault();
                            const review = event.target.review.value;
                            event.target.review.value = '';
        
                            const reviewsList = document.getElementById('reviews-list');
                            const newReview = document.createElement('li');
                            newReview.innerHTML = `<strong>${films[i].title}:</strong> ${review}`
                            reviewsList.append(newReview);
                            //newReview.innerHTML = '';
                        })

                        const resetButton = document.getElementById('reset-reviews');
                        resetButton.addEventListener('click', (event) => {
                            reviewsList = document.getElementById('reviews-list');
                            reviewsList.innerHTML = '';
                        })

                        const showPeople = document.getElementById('show-people');
                        showPeople.addEventListener('click', (event) => {
                            for (let j = 0; j < films[i].people.length; j++) {
                                const peopleList = document.getElementById('people-list');
                                const person = document.createElement('li');
                                person.innerText = films[i].people[j];
                                peopleList.append(person);
                                //const person = films[i].people[j];
                                
                            }
                        })

                    }
                }
                
                /*  
                When the user enters their review into the text input and presses the "Submit Review" button,
                    they should see:
                The review, inside of an unordered list of li elements, with the name of the movie in a strong 
                element and the text of the review afterwards.
                The review text should be cleared from the text input.
                */
            }) 
        })
    })

}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
