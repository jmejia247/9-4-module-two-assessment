





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch("https://resource-ghibli-api.onrender.com/films/")
    .then((response) => response.json())
    .then((movies) => {
        console.log (movies)
        //this will take this data and prepare to "attach it to the following variables"
      const select = document.querySelector("#titles");
      const details = document.querySelector("#display-info");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");
      const p2 = document.createElement("p");
      const reset = document.querySelector("#reset-reviews");
      const ul = document.querySelector("ul");
      const ol = document.querySelector("ol");
      const people = document.querySelector("#show-people");
      const dropdown = document.querySelector('#titles')
      const BASE_URL = "https://resource-ghibli-api.onrender.com";


// these next logic of functions will search through the data & will allow us to use the "option menu to find movies by ID! //

movies.forEach(movie => {
    // console.log(movie)
    let tag = document.createElement("option")
    tag.innerText = movie.title
    tag.value = movie.id
    dropdown.append(tag)
  });
})
// lines 30 - 35 wont run when all my logic is active. When comment out it runs. 
// This logic is to display the details of each movie when the option is selected

    movies.forEach((movie) => {
      
      if (movie.id === event.target.value) {
        h3.textContent = movie.title;
        p.textContent = movie.release_date;
        p2.textContent = movie.description;
        details.innerHTML = "";
      }
    });





//this logic is for the user to submit a review in the input box
const form = document.querySelector("form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (select.value === "") {
          alert("Please select a movie first");
        } else {
          const ul = document.querySelector("ul");
          const li = document.createElement("li");
          li.innerHTML = `<strong>${h3.textContent}:</strong> ${review.value}`;
          ul.append(li);
          review.value = "";
        }
      });

      reset.addEventListener("click", (event) => {
        ul.innerHTML = "";
      });
      people.addEventListener("click", (event) => {
        event.preventDefault();
        ol.innerHTML = "";
      fetch(`${BASE_URL}/people`)
        .then((response) => response.json())
        .then((json) => {

            for (let person of json) {
              if (person.films[0].includes(select.value)) {
                ol.innerHTML += `<li>${person.name}</li>`;
              }
            }
          });
        });
} 
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000)