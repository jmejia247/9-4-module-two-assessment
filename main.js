// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    // Add code you want to run on page load here
    const BASE_URL = "https://resource-ghibli-api.onrender.com"
    const BASE_URL_FILMS = `${BASE_URL}/films`;
    // const BASE_URL_PEOPLE = `${BASE_URL}/people`;
    const select = document.querySelector("select");
    const form = document.querySelector(".review-form");
    const input = document.querySelector(".review");
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    const strong = document.createElement("strong");
    const displayInfo = document.querySelector(".display-info");
    const peopleButton = document.querySelector(".show-people");

  fetchData(BASE_URL_FILMS);

  async function fetchData(BASE_URL_FILMS) {
    const response = await fetch(BASE_URL_FILMS);
    const movies = await response.json();
    populateSelect(movies);
   
  }

  function populateSelect(arr){
    arr.forEach((movie) => {
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


 peopleButton.addEventListener("click", (e) => {
    e.preventDefault();
    const ol = document.querySelector(".people")
    async function populatePeople (url) {
        const response = await fetch("https://resource-ghibli-api.onrender.com/people");
        const people = await response.json()
        people.forEach((people) => {
            const liPeople = document.createElement("li");
            liPeople.innerHTML = people.name
            ol.append(liPeople)
        })
        
        
    }
    
    populatePeople()
 })



    function clearElement(element) {
      element.innerHTML = "";
    }
  });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
