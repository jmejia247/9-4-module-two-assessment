// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
function run() {


    const BASE_URL = 'https://resource-ghibli-api.onrender.com/films';

    fetch(`${BASE_URL}`)
    .then((response) => response.json())
    .then((films) => {
        const movies = document.querySelector(".dropdown");
        for (const film of films) {
            const option = document.createElement("option");
            option.textContent = film.title;
            option.setAttribute("value", film.title);
            movies.append(option)
        }})



    
            }
    // This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
    // So that testing can work as expected for now
    // A non-hacky solution is being researched
    
    setTimeout(run, 1000);