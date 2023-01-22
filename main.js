// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

const base_URL = "https://resource-ghibli-api.onrender.com/films"
const people_URL = "https://resource-ghibli-api.onrender.com/people/"
const select = document.querySelector("select");
const form = document.querySelector("form");

function run() {
    // Add code you want to run on page load here

    fetch(base_URL).then(response => response.json()).then(movieData => {
        for(let i = 0; i < movieData.length; i++){
            //const title = data[i].title;
            const option = document.createElement("option");
            select.append(option);
            option.textContent = movieData[i].title;
            option.setAttribute("value", movieData[i].id);

            movieInfo(movieData);
        }
    })
}
    function movieInfo(movieData) {
        select.addEventListener("change", (event) => {
            event.preventDefault();

            const info = document.querySelector("#display-info");
            info.innerHTML = ""
            const h3 = document.createElement("h3")
            const pTag = document.createElement("p")
            const pTag2 = document.createElement("p")

            for(let i = 0; i < movieData.length; i++){
                if(select.value === movieData[i].id) {
                    h3.textContent = `${movieData[i].title}`
                    pTag.textContent = `${movieData[i].release_date}`
                    pTag2.innerHTML = `${movieData[i].description}`
                    info.append(h3, pTag, pTag2)
                }
            }
        })
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if(select.selectedIndex === 0) {
        window.alert(`Please select a movie first`);

    }else {
        const name = select[select.selectedIndex].innerHTML;
        const movieReview = document.querySelector("#review")
        const reviewEntry = movieReview.value
        const list = document.createElement("li")
        list.innerHTML = `<strong><b>${name}: </b></strong>${reviewEntry}`;
        const ul = document.querySelector("ul") 
        ul.append(list);

        form.reset();
    }
    })

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);