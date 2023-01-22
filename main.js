// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  const BASE_URL = "https://resource-ghibli-api.onrender.com/films";
  let select = document.querySelector("select");
  let form = document.querySelector(".review-form");
  let input = document.querySelector(".review");
  let ul = document.querySelector("ul");
  let li = document.createElement("li");
  const strong = document.createElement("strong");

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

      displayInfo.append(title, releaseDate, description);
    }
    displayMovieInfo(e.target.value);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let movieReviewed = select.options[select.selectedIndex].text;
      const review = input.value;

      console.log(review);
      strong.textContent = `${movieReviewed}:`;
      li.innerHTML = review;
      li.append(strong);
      ul.append(li);

      input.value = "";
    });

    const resetReviews = document.querySelector(".reset-reviews");
    resetReviews.addEventListener("click", (e) => {
      e.preventDefault();
      clearElement(ul);
    });

    function clearElement(element) {
      element.innerHTML = "";
    }
  });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
