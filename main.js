// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  const BASE_URL = "https://resource-ghibli-api.onrender.com/films";
  let select = document.querySelector("select");

  populateSelect(BASE_URL);

  async function populateSelect(BASE_URL) {
    const response = await fetch(BASE_URL);
    const movie = await response.json();
    movie.forEach((movie) => {
      let tag = document.createElement("option");
      tag.innerHTML = movie.title;
      tag.value = movie.id;
      select.append(tag);
    });
  }

  select.addEventListener("change", (e) => {

    async function displayMovieInfo(input) {
      const response = await fetch(
        `https://resource-ghibli-api.onrender.com/films/${input}`
      );
      const movie = await response.json();

      let displayInfo = document.querySelector(".display-info");
      let title = document.querySelector(".title");
      
      let releaseDate = document.createElement("p");
      let description = document.createElement("p");

      title.innerHTML = movie.title;
      releaseDate.innerHTML = movie.release_date;
      description.innerHTML = movie.description;

      displayInfo.append(title,description,releaseDate);
    }
    displayMovieInfo(e.target.value);
  });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
