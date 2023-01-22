





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
const URL = "https://resource-ghibli-api.onrender.com"
function run() {
    const dropdown = document.querySelector(".dropdown");
    fetch (`${URL}/films`).
    then(response => response.json()).
    then(data => {
        for (let i = 0; i <data.length; i++) {
            const anOption = document.createElement("option");
            anOption.innerText = data[i].title;
            anOption.value = i;
            dropdown.append(anOption);
        }  
        dropdown.addEventListener("change", (event) => {
            const displayInfo = document.getElementById("display-info");
            displayInfo.innerHTML = "";
            const h3ElementTitle = document.createElement("h3");
            const pElementYear = document.createElement("p");
            const pElementDescription = document.createElement("p");
            h3ElementTitle.innerText = data[dropdown.value].title;
            pElementYear.innerText = data[dropdown.value].release_date;
            pElementDescription.innerText = data[dropdown.value].description;
            displayInfo.append(h3ElementTitle, pElementYear, pElementDescription);
        });
        document.getElementById("show-people").addEventListener("click", (event) => {
            const movieIndex = document.querySelector(".dropdown").value;
            const peopleArray = data[movieIndex].people;
            console.log(peopleArray);
            const orderedList = document.querySelector("ol");
            orderedList.innerHTML = "";
            peopleArray.forEach((person) => {
                const listItem = document.createElement("li");
                fetch(`https://resource-ghibli-api.onrender.com${person}`).
                then(personResponse => personResponse.json()).
                then(personObject => {
                    listItem.innerText = personObject.name;
                    orderedList.append(listItem);
                });
            });
        });
    });

 // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);

const addReview = function fAddReview (event) {
    event.preventDefault();
    const unorderedList = document.getElementById("reviews");
    const listItemReview = document.createElement("li");
    const strongTitle = document.createElement("strong");
    const reviewText = document.getElementById("review").value;
    const movieSelector = document.querySelector(".dropdown");
    const currentMovie = movieSelector.options[movieSelector.selectedIndex].text;
    if (!currentMovie) {
        alert("Please select a movie first");
    } else {
        document.getElementById("review").value = "";
        strongTitle.innerText = `${currentMovie}: `;
        listItemReview.append (strongTitle, reviewText);
        unorderedList.appendChild(listItemReview);
    }
}

const removeReviews = function fRemoveReviews (event) {
    const unorderedList = document.getElementById("reviews");
    unorderedList.innerHTML = "";
}

