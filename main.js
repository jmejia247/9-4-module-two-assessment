





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here

 const getTitles = document.querySelector('select');
 const ul = document.querySelector('')

 fetch("https://resource-ghibli-api.onrender.com/films")
    .then(response => response.json())
    .then(movies => {
        console.log(movies);
    
    let currMovie = "";
    movies.forEach(movie => {

    })


    })

}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
