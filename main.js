





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

const BASE_URL = "https://resource-ghibli-api.onrender.com/films"
const PEOPLE_URL = "https://resource-ghibli-api.onrender.com/people/"
const choose = document.querySelector('select');
const form = document.querySelector('form');

function run() {
    // Add code you want to run on page load here

    fetch(BASE_URL).then(response => response.json()).then(movieInfo => {
        for(let i = 0; i < movieInfo.length; i++){
            //const title = data[i].title;
            const option = document.createElement('option');
            choose.append(option);
            option.textContent = movieInfo[i].title;
            option.setAttribute('value', movieInfo[i].id);
    
            movieDescription(movieInfo);
        }
    })
}
    function movieDescription(movieInfo) {
        choose.addEventListener('change', (event) => {
            event.preventDefault();
    
            const info = document.querySelector('#display-info');
            info.innerHTML = ''
            const h3 = document.createElement('h3')
            const pTag = document.createElement('p')
            const pTag2 = document.createElement('p')

            for(let i = 0; i < movieInfo.length; i++){
                if(choose.value === movieInfo[i].id) {
                    h3.textContent = `${movieInfo[i].title}`
                    pTag.textContent = `${movieInfo[i].release_date}`
                    pTag2.innerHTML = `${movieInfo[i].description}`
                    info.append(h3, pTag, pTag2)
                }
            }    
        })
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if(choose.selectedIndex === 0) {
        window.alert(`Please select a movie first`);

    }else {
        const name = choose[choose.selectedIndex].innerHTML;
        const filmReview = document.querySelector('#review')
        const reviewInfo = filmReview.value
        const list = document.createElement('li')
        list.innerHTML = `<strong><b>${name}: </b></strong>${reviewInfo}`;
        const ul = document.querySelector('ul') 
        ul.append(list);

        form.reset();
    }
    })

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
