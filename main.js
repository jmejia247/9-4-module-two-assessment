// [
//     {
//       "id": "2baf70d1-42bb-4437-b551-e5fed5a87abe",
//       "title": "Castle in the Sky",
//       "original_title": "天空の城ラピュタ",
//       "original_title_romanised": "Tenkū no shiro Rapyuta",
//       "description": "The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the help of resourceful Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to use Laputa's science to make himself ruler of the world.",
//       "director": "Hayao Miyazaki",
//       "producer": "Isao Takahata",
//       "release_date": "1986",
//       "running_time": "124",
//       "rt_score": "95",
//       "people": [
//         "/people/"
//       ],
//       "species": [
//         "/species/af3910a6-429f-4c74-9ad5-dfe1c4aa04f2"
//       ],
//       "locations": [
//         "/locations/"
//       ],
//       "vehicles": [
//         "/vehicles/"
//       ],
//       "url": "/films/2baf70d1-42bb-4437-b551-e5fed5a87abe"
//     },
//   ]

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

const displayInfo = document.querySelector('#display-info');
const getTitles = document.querySelector('select');
const reviewForm = document.querySelector('form');
const getPeople = document.querySelector('#show-people');
const reviews = document.querySelector('#review');
const reset = document.querySelector('#reset-reviews');
const ul = document.querySelector('ul');
const ol = document.querySelector('ol');



function run() {
 // Add code you want to run on page load here

 fetch("https://resource-ghibli-api.onrender.com/films")
    .then(response => response.json())
    .then(movies => {
        // console.log(movies);
    movies.forEach(movie => {
        let currMovie = document.createElement('option');
        currMovie.value = movie.title;
        currMovie.innerHTML = movie.title;
        getTitles.append(currMovie);

    getTitles.addEventListener('change', (e) => {
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

        const userInput = e.target.review.value;
        const li = document.createElement('li');


    })

    })

}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
