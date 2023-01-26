// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
function run() {
  //show your not a novice don't "let" "const" not show up -- think of a lifecycle the urls dont change only the endpoints. list items change.
  let films = [];
  let chosenFilm = undefined;
  let filmTitles = document.getElementById("titles");
  let showPeopleClick = document.getElementById("show-people");
  const reviewForm = document.getElementById("form-for-review");
  const resetReview = document.getElementById("reset-reviews");
  let listReview = document.getElementById("list-review");
  // this was missing -- cmon cephus
  // forgot to add the main & forgot to add the correct class id for reset reviews
  const reviewList = document.querySelector("ul");
  const BASE_URL = `https://resource-ghibli-api.onrender.com`;
  const FILMS_URL = `${BASE_URL}/films`;
  const PPL_URL = `${BASE_URL}/people`;

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
      console.log(chosenFilm);
      document.getElementById(
        "display-info"
        // forgot to add a movie title to your class name
        // film value is way outta scope
      ).innerHTML = `<h3 class="movie-title">${chosenFilm[0].title}</h3><p>${chosenFilm[0].release_date}</p><p>${chosenFilm[0].description}</p>`;
      let orderedList = document.querySelector("ol");
      orderedList.innerHTML = "";
    }
  });

  showPeopleClick.addEventListener("click", (event) => {
    event.preventDefault();

    const movieSelected = document.querySelector("#titles").value;
    //confirmation that the id has been registered and the logic belongs to that movie
    console.log(movieSelected);
    if (!movieSelected) {
      alert("Please select a movie first");
      return;
    }
    const characters = document.querySelector("#characters");
    characters.classList.toggle("hidden");

    function showPeople() {
      // gets the value of the title of the dropdown menu.
      const movieSelected = document.querySelector("#titles").value;
      const orderedList = document.querySelector("ol");
      orderedList.innerHTML = "";
    }

    // fetch the people in the film
    fetch(PPL_URL)
      .then((response) => response.json())
      .then((peopleInFilm) => {
        const correctThePeople = peopleInFilm.filter((person) =>
          person.films.includes(`/films/${movieSelected}`)
        );
        const characters = document.querySelector("#characters");
        //iterating through the right list of characters.
        correctThePeople.forEach((person) => {
          //every character had their own list element.
          const listElement = document.createElement("li");
          //update the list element with the name of the character
          listElement.textContent = person.name;

          // add it in with the append for the ordered list. that you forgot the first time cephus.
          characters.append(listElement);
        });
        // this wil find the area of the hidden values and allow it to display.
        characters.classList.toggle("hidden");
      })
      .catch((error) => console.log(error));
  });

  // create an event listener fot the submit button for selecting movie
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const movieSelected = document.querySelector("#titles").value;
    // access the value of the dropdown. the first option from dropdown should be of no value -- for this alert to even register.
    if (!movieSelected) {
      alert("Please select a movie first");
      return;
      // breakout of this above -- with the return!
    }

    const movieTitle = document.querySelector(".movie-title").innerText;
    //get the innertext of the movie above
    // needed to add a prevent default above and reference event

    // grab your review and contain it below
    // grab the review the user chose
    const review = event.target.review.value;
    listReview.innerHTML += `<li><strong>${movieTitle}: </strong> ${review}</li>`;
    event.target.review.value = "";
  });

  //reset the values of the
  resetReview.addEventListener("click", () => {
    reviewList.innerHTML = "";
  });
}
setTimeout(run, 1000);
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched
