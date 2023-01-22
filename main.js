// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
function run() {
  let films = [];
  let chosenFilm = undefined;
  let filmTitles = document.getElementById("titles");
  let showPeopleClick = document.getElementById("show-people");
  let submitClick = document.getElementById("submit-click");
  let resetReview = document.getElementById("reset-the-review");
  const reviewList = document.querySelector("ul");
  const BASE_URL = `https://resource-ghibli-api.onrender.com`;
  const FILMS_URL = `${BASE_URL}/films`;
  const PPL_URL = `${BASE_URL}/people`;
  let myFilmResults = films;

  //start my fetch for the films --> GET the movies
  //using this to creat options and populate dropdown 
  fetch(FILMS_URL)
    .then((results) => results.json())
    .then((resJson) => {
      films = resJson;
      films.forEach((film) => {
        filmTitles.add(new Option(film.title, film.id));
      });
    });
  //I'm going to try a regular for loop to go through the review list and replace the review with an empty string
  //for(let i = 0; i < store.length; i++) {
//     if (savedValue.key(i).includes("review")) {
//       reviewList.innerHTML += `<li><strong>${savedValue
//         .key(i)
//         .replace("review", "")}: </strong> ${savedValue.getItem(
//         savedValue.key(i)
//       )}</li>`;
//     }
//   }
  //lets listen for the click event for films below -- then lets populate into the p tags and ol tags the films title, release date & description ---> the change value only works with dropdown.

  filmTitles.addEventListener("change", (event) => {
     event.preventDefault();
    let filmValue = filmTitles.value;
    console.log(filmValue);
    //set up your conditions if the value is empty or not present
    if (filmValue === "" || filmValue === undefined || filmValue === false) {
      chosenFilm = undefined;
      //if present then function and populate the values of Chosen Film
    } else {
      chosenFilm = films.filter((film) => film.id === filmValue);
      console.log(chosenFilm)
      document.getElementById(
        "display-info"
      ).innerHTML = `<h3>${chosenFilm[0].title}</h3><p><${chosenFilm[0].original_title}</p><p>${chosenFilm[0].release_date}</p><p>${chosenFilm[0].description}</p>`;
      let orderedList = document.querySelector("ol");
      orderedList.innerHTML = "";
    }
  });

  showPeopleClick.addEventListener("click", () => {
    if (chosenFilm[0] != undefined) {
      let orderedList = document.querySelector("ol");
      orderedList.innerHTML = "";
      if (chosenFilm[0].people.length === 1) {
        chosenFilm[0].people.forEach(async (PPL_URL) => {
          fetch(PPL_URL)
            .then((results) => results.json())
            .then((peopleData) => {
              peopleData.forEach((character) => {
                orderedList.innerHTML += `<li>${character.name}</li>`;
              });
            });
        });
      } else {
        chosenFilm[0].people.forEach(async (person) => {
          fetch(PPL_URL)
            .then((results) => results.json())
            .then((peopleData) => {
              console.log(peopleData);
              orderedList.innerHTML += `<li>${peopleData.name}</li>`;
            });
        });
      }
    }
  });

  // create an event listener fot the submit button for selecting movie
  submitClick.addEventListener("click", () => {
    //if the chosen film values of 2 diff edgecases throw an alert to input selection
    let store = filmValue
    console.log(store)
    if (chosenFilm[0] === "" || chosenFilm[0] === undefined) {
      alert("Please select a movie first");
    } else {
      let review = document.getElementById("review").value;
      store.setItem(chosenFilm[0].title + "review", review);
      reviewList.innerHTML += `<li><strong>${chosenFilm[0].title}: </strong> ${review}</li>`;
      document.getElementById("review").value = "";
    }
  });
  //reset the values of the 
  resetReview.addEventListener("click", () => {
    store.clear();
    reviewList.innerHTML = "";
  });


}
setTimeout(run, 1000);
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

