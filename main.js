





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
let dropdown = document.getElementById("titles");

function run() {
 // Add code you want to run on page load here
 fetch("https://resource-ghibli-api.onrender.com/films").then(response => response.json()).then(data => {
    movieTitles(data);
    dropdownChange();

 });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);

function movieTitles(data) {
    data.forEach(film => {
        let tag = document.createElement("option");
        tag.innerText = film.title;
        tag.value = film.id;
        dropdown.append(tag);
    });
}

function dropdownChange() {
dropdown.addEventListener("change", (event) => {
        id = dropdown.value;
        clearElements();
        resetPeople();
        fetch(`https://resource-ghibli-api.onrender.com/films/${id}`).then(response => response.json()).then(movie => {
            filmDetails(movie);
            userReview(movie);
            showPeople(movie);
        })
    })
}

function filmDetails(movie) {
    let section = document.getElementById("display-info");
            h3 = document.createElement("h3");
            h3.innerText = movie.title;
            section.append(h3);
            let p1 = document.createElement("p");
            p1.innerText = movie.release_date;
            section.append(p1);
            let p2 = document.createElement("p");
            p2.innerText = movie.description;
            section.append(p2);
}

function userReview(movie) {
    document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        let review = event.target.review.value;
        let ul = document.querySelector("ul");
        document.querySelector('input').value = '';
            if (dropdown.value === '') {
                alert("Please select a movie first")
            } else {
            let listItem = ul.appendChild(document.createElement("li"));
            listItem.class = 'user-review';
            listItem.innerHTML = `<strong>${movie.title}:</strong> ${review}`
            }
        
    })
}

function showPeople(movie) {
    document.getElementById("show-people").addEventListener("click", (event) => {
        event.preventDefault();
        let ol = document.querySelector("ol");
        let id = movie.id;
        async function fetchAsync() {
            let response = await fetch(`https://resource-ghibli-api.onrender.com/people`);
            let data = await response.json();
            return data;
        }
        
        fetchAsync()
            .then(people => {
                for (person of people) {
                    let personFilms = person.films;
                    let personName = person.name;
                    for (film of personFilms) {
                        let sliceID = film.slice(7,43)
                        
                        if (sliceID === id) {
                            let personLi = ol.appendChild(document.createElement("li"));
                            personLi.innerText = personName;
                        }
                    }
                }
            })
        
    })
}




document.getElementById("reset-reviews").addEventListener("click", (event) => {
    document.querySelector("ul").innerHTML = '';
})



function resetPeople() {
    document.querySelector("ol").innerHTML = '';
}

function clearElements() {
    if (document.querySelector("h3")) {
        document.querySelector("h3").remove();
    }
    if (document.querySelectorAll("p")) {
        let paras = document.querySelectorAll("p")
        for (element of paras) {
            element.remove();
        }
    }
}