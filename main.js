





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

const BASE_URL = "https://resource-ghibli-api.onrender.com/films"
const PEOPLE_URL = "https://resource-ghibli-api.onrender.com/people/"
const select = document.querySelector('select');
const form = document.querySelector('form');

function run() {
    // Add code you want to run on page load here
    let dropdown = document.querySelector(".dropdown")

    fetch(BASE_URL).then(response => response.json()).then(movieInfo => {
        for(let i = 0; i < movieInfo.length; i++){
            //const title = data[i].title;
            const option = document.createElement('option');
            select.append(option);
            option.textContent = movieInfo[i].title;
            option.setAttribute('value', movieInfo[i].id);
    
            movieDescription(movieInfo);
        }
    })
    .catch((error)=> console.log(error))
}
    function movieDescription(movieInfo) {
        select.addEventListener('change', (event) => {
            event.preventDefault();
    
            const info = document.querySelector('#display-info');
            info.innerHTML = ''
            const h3 = document.createElement('h3')
            const pTag = document.createElement('p')
            const pTag2 = document.createElement('p')
        })
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
