

const BASE_URL = `https://resource-ghibli-api.onrender.com`
const FILMS_URL = `${BASE_URL}/films`
const PPL_URL = `${BASE_URL}/people` 
//Below lets try to add some flair invoking the Japanes names
const OGNAME_URL = `${BASE_URL}/films/original_title`

fetch(BASE_URL)

let dropItLow = document.querySelector(".dropdown")
//we use ".___" inside of the querySelector so it knows we are talking to the HTML doc.



// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
