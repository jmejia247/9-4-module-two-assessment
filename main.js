// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  const url = `https://resource-ghibli-api.onrender.com/films
`;

  // const
  let dropDown = document.getElementById("titles");

  //fetch api
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      // let option = document.querySelector("option");
      // creating drop section for movie titles
      //   let option = document.createElement("option");
      for (let i = 0; i < data.length; i++) {
        let option = document.createElement("option");
        option.value = data[i].id;
        option.textContent = data[i].title;
        dropDown.append(option);

        dropDown.addEventListener("change", (e) => {
          e.preventDefault();
          console.log(dropDown.value);
          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);

              if (e.target.value === data[i].id) {
                let movieDiv = document.getElementById("display-info");

                let movieTitle = document.createElement("h3");
                movieTitle.innerHTML = `${data[i].title}`;
                // movieDiv.append(movieTitle);

                let movieYear = document.createElement("p");
                movieYear.innerHTML = `${data[i].release_date}`;

                let movieDes = document.createElement("p");
                movieDes.innerHTML = `${data[i].description}`;

                movieDiv.append(movieTitle, movieYear, movieDes);
              }
            });
        });

        // adding reviews buton
        const reviewForm = document.querySelector("form");

        const submitReview = document.querySelector("#reviews");
        reviewForm.addEventListener("submit", (e) => {
          e.preventDefault();
          console.log(e);
          let review = e.target.review.value;

          if (dropDown.value === "") {
            alert("Please select a movie before writing a review");
          } else {
            let movie = dropDown.value;
            const ol = document.querySelector("ol");
            let li = document.createElement("li");
            li.innerHTML = `<strong>${movie}:</strong>${review}`;
            ol.append(li);
          }
          e.target.reset();
        });

        const button = document.getElementById("show-people");

        // button.addEventListener("submit", (e) => e.preventDefault());
        // const ol = document.querySelector("ol");
        const peopleUrl = `https://resource-ghibli-api.onrender.com/people`;
        // console.log();
        // ol.textContent = "";

        fetch(peopleUrl)
          .then((res) => res.json())
          .then((people) => {
            console.log(people);
            // let reviewsSection = document.getElementById("reviews");
            button.addEventListener("submit", (e) => e.preventDefault());
            const ol = document.querySelector("ol");
            // const peopleUrl = `https://resource-ghibli-api.onrender.com/people`;
            console.log();
            ol.textContent = "";
            for (let i = 0; i < data.length; i++) {
              let arrayPeople = data[i].people;
              console.log(arrayPeople);
              people.forEach((person) => {
                for (let moviePerson of arrayPeople) {
                  if (moviePerson.includes(person.id)) {
                    console.log("hi");
                    let li = document.createElement("li");
                    li.innerHTML = ` <strong>${person.name}:</strong>`;
                    ol.append(li);
                  }
                }
              });
            }
            // people.forEach((person) => {
            //   let pplArr = data[i].person;
            //   console.log(pplArr);
            //   if (pplArr === person.id) {
            //     console.log("match");
            //   }
            //   let movieId = option.value;
            //   console.log(movieId);
            // });

            //   console.log(movie);
            //   if (person.film === option.value) {
            //     const li = document.createElement("li");
            //     // li.innerHTML =
            //   }
            // });
          })
          .catch((err) => console.log(err));
      }
      // data.forEach((film) => {
      //   console.log(film.title);

      //   option.innerText = film.title;
      //   option.value = film.id;
      //   dropDown.append(option);
      // });
    })
    .catch((err) => console.log(err));
  // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
