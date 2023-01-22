// To ensure Cypress tests work as expected, add any code/functions that you would like to run on page load inside this function

function run() {
    // Add code you want to run on page load here
}
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched
setTimeout(runMyCode, 1000);


/** My code: */
function runMyCode() {
    const BASE_URL = "https://resource-ghibli-api.onrender.com";

    const movieOption = document.querySelector(".movie-title");
    const movieInfo = document.querySelector("#display-info");
    const unordered = document.querySelector("#reviews ul");
    const ordered = document.querySelector("#people ol");
    
    getMovieTitle()
    async function getMovieTitle() {
        await fetch(`${BASE_URL}/films`)
        .then(response => response.json())
        .then(result => {
            result.forEach(movie => {
                const { id, title } = movie;
                const option = document.createElement("option");
                option.innerText = title;
                option.value = id;
                movieOption.append(option);
            })
        })
        .catch((error) => error);
    }
    
    
    movieOption.addEventListener("change", async (event) => {
        event.preventDefault();
    
        await fetch(`${BASE_URL}/films/${movieOption.value}`)
        .then(response => response.json())
        .then(result => {
            // console.log(result.people)
            const { title, release_date, description } = result;
    
            if(movieInfo.children.length > 0) {
                movieInfo.textContent = "";
            }
    
            if(ordered.childElementCount > 0) {
                ordered.textContent = "";
            }
    
            const name = document.createElement("h3");
            name.textContent = title;
    
            const year = document.createElement("p");
            year.textContent = release_date;
    
            const about = document.createElement("p");
            about.textContent = description;
    
            movieInfo.append(name, year, about);
        })
        .catch((error) => error);
    })
    
    
    const submitReview = document.querySelector(".add-review form");
    submitReview.addEventListener("submit", async (event) => {
        event.preventDefault();
    
        const userReview = event.target.review.value;
        
        if(movieOption.value === "") {
            alert("Please select a movie first");
        } else {
            document.querySelector("#review").value = "";
    
            const list = document.createElement("li");
            const strong = document.createElement("strong");
        
            strong.textContent = movieInfo.firstChild.textContent + ": ";
            list.textContent = userReview;
        
            list.prepend(strong);
            unordered.append(list);
        }
    })
    

    const resetReview = document.querySelector("#reset-reviews");
    resetReview.addEventListener("click", async (event) => {
        event.preventDefault();
    
        if(unordered.children.length > 0) {
            unordered.textContent = "";
        }
    })
    

    const submitPeople = document.querySelector("#show-people");
    submitPeople.addEventListener("click", async (event) => {
        event.preventDefault();
    
        await fetch(`${BASE_URL}/people`)
        .then(response => response.json())
        .then(result => {
            result.forEach(character => {
                const { films, name } = character;

                if(films[0].includes(movieOption.value)) {  
                    console.log(films, name, movieOption.value)      
                    const list = document.createElement("li");
                    list.textContent = name;
                    ordered.append(list);
                }
            })
        })
        .catch((error) => error);
    })
}