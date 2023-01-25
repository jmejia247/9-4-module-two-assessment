// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

//Global variables
let titles = document.querySelector("#titles");
let movieName = "";
let people = [];

//Run function only runs the fetch
function run() {
  // Add code you want to run on page load here


//Fetch data with with option which is dropdownlist. 
  fetch(`https://resource-ghibli-api.onrender.com/films
 `)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      data.forEach((movie) => {
        // console.log(movie);
        // option which is dropdown and input the id and change to title name
        let tag = document.createElement("option");
        tag.innerText = movie.title;
        tag.value = movie.id;
        titles.append(tag);
      });
    });
}

//Get movie details
titles.addEventListener("change", (e) => {
  fetch(`https://resource-ghibli-api.onrender.com/films/${titles.value}`)
    .then((response) => response.json())
    .then((movie) => {
      console.log(movie);
      let details = document.querySelector("#details");
      details.innerHTML = "";
      movieName = movie.title;
      people = movie.people;
      let name = document.createElement("h3");
      name.textContent = movie.title;
      details.append(name);
      let year = document.createElement("p");
      year.textContent = movie.release_date;
      details.append(year);
      let description = document.createElement("p");
      description.textContent = movie.description;
      details.append(description);
    });
});

//review form with alert box

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const ul = document.querySelector("ul");
  if (titles.value === "") {
    window.alert("Please select a movie");
  } else {
    const review = document.querySelector("#review");
    const li = document.createElement("li");
    li.innerHTML = `<strong>${movieName}</strong>: ${e.target.review.value}`;
    ul.append(li);
  }
  console.log(movieName);
});
//reset button and make new element
const reset = document.querySelector("#reset-reviews");
const review = document.querySelector("#reviews h2");
reset.addEventListener("click", (event) => {
  const ul = document.querySelector("ul");
  ul.remove();
  const newUl = document.createElement("ul");
  review.after(newUl);
});

//Show people button
const showPeople = document.querySelector("#people");
const ol = document.querySelector("ol");

showPeople.addEventListener("click", (event) => {
  console.log(people);
  people.forEach((element) => {
    fetch(`https://resource-ghibli-api.onrender.com${element}`)
      .then((response) => response.json())
      .then((person) => {
        // console.log(person.length);
        if (person.length > 0) {
          person.forEach((el) => {
            let character = document.createElement("li");
            character.textContent = el.name;
            ol.append(character);
          });
        } else {
          let character = document.createElement("li");
          character.textContent = person.name;
          ol.append(character);
        }
      });
  });
});
// Removes the people list after changing to new movie
titles.addEventListener("change", (event) => {
  const ol = document.querySelectorAll("ol li");
  ol.forEach((li) => {
    li.remove();
  });
});

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
