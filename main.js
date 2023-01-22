

const BASE_URL = `https://resource-ghibli-api.onrender.com`
const FILMS_URL = `${BASE_URL}/films`
const PPL_URL = `${BASE_URL}/people`

fetch(BASE_URL)

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    const films = []
    const filmTitles = document.getElementById("titles")
    const reviewList = document.querySelector("ul")
    const showPeopleClick = document.getElementById("show-people")
    const submitClick = document.getElementById("show-people")
    fetchGhibliEnds("films");
}
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched


//Below lets get the endpoints for the movieID
const fetchGhibliEnds = async (endpoint, movieID) => {
    const endUrl = endpoint === "films" ? FILMS_URL : PPL_URL
    const myData = await 
}
//This is to handle the reponse of data and will throw error if input is not ok.
const myResponse = (response) => {
    if (!response.ok) {
        throw Error("Something is Wrong")
    }
    return response.json();
}
// Lets fetch my Data using async since we will be running a timeout
const dataFetch = 



setTimeout(run, 1000);
