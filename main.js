// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here

  let dropdown = document.querySelector(".dropdown");
  fetch(`https://resource-ghibli-api.onrender.com/films
 `)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      data.forEach((movie) => {
        // console.log(movie);
        let tag = document.createElement("option");
        tag.innerText = movie.title;
        tag.value = movie.id;
        dropdown.append(tag);
      });
    });
  dropdown.addEventListener("change", (e) => {
    //   console.log(dropdown.value);
    fetch(`https://resource-ghibli-api.onrender.com/films/${dropdown.value}`)
      .then((response) => response.json())
      .then((movie) => {
        let details = document.querySelector(".details");
        details.innerHTML = "";

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

  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();

    li.textContent = event.target.review.value;

    ul.append(li);

    fetch(`https://resource-ghibli-api.onrender.com/films
                ${event.target.review.value}`)
      .then((data) => {
        return data.json();
      })
      .then(() => {
        movieDetails(event.target.review.value);

        document.querySelector("input").value = "";
      });
  });
  run(data);
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
