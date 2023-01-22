// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    
  // Add code you want to run on page load here
  let dropdown = document.querySelector(".dropdown");
  const header = document.querySelector(".header");
  const header1 = document.createElement("h1");
  header1.textContent = "Ghibli Review App";
  const img = document.querySelector("img");
  img.setAttribute("src", "./images/ghibli-logo.png");
  img.setAttribute("alt", "Ghibli logo");
  header.append(header1, img);

  const h2 = document.querySelector(".h2");
  const h2title = document.createElement("h2");
  h2title.textContent = "Select a movie";
  h2.append(h2title);
// function getTitle() {
  fetch(`https://resource-ghibli-api.onrender.com/films`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      data.forEach((films) => {
        let movie = document.createElement("option");
        movie.innerText = films.title;
        movie.value = films.id;
        dropdown.append(movie);
        //  console.log(films.id)
         const id = films.id
         console.log(films.id)
      }); //fetch1
      
    }); // data
// }
    
    dropdown.addEventListener("change", (id) => {
        fetch(`https://resource-ghibli-api.onrender.com/films/${id}`)
          .then((response) => response.json())
          .then((films) => {
            
            const id = films.id;
    console.log(films.id);
    
            let des = document.querySelector(".card");
            des.innerHTML = "";
            // console.log("movie.title");
            let title = document.querySelector("h3");
            title.textContent = films.title;
            des.append(data);
    
            let date = document.createElement("p");
            date.textContent = films.release_dates;
            des.append(date);
    
            let note = document.createElement("p");
            note.textContent = films.description;
            des.append(note);
    
            let people = document.querySelector(".people");
            let peopletitle = document.createElement("h2");
            people.textContent = "People";
            people.append(peopletitle);
    
            list = document.querySelector("ol");
            list.textContent = films.people;
            people.append(list);
    
            let review = document.querySelector(".review");
            let input = document.querySelector("#input.value")
            newReview.append(input)
            let newReview = document.querySelector("#review")
           
          });
      });
//   dropdown.addEventListener("change", (e) => {
//     fetch(`https://resource-ghibli-api.onrender.com/films/${id}`)
//       .then((response) => response.json())
//       .then((films) => {
//         console.log("flims");

//         let des = document.querySelector(".card");
//         des.innerHTML = "";
//         console.log("movie.title");
//         let title = document.querySelector("h3");
//         title.textContent = films.title;
//         des.append(data);

//         let date = document.createElement("p");
//         date.textContent = films.release_dates;
//         des.append(date);

//         let note = document.createElement("p");
//         note.textContent = films.description;
//         des.append(note);

//         let people = document.querySelector(".people");
//         let peopletitle = document.createElement("h2");
//         people.textContent = "People";
//         people.append(peopletitle);

//         list = document.querySelector("ol");
//         list.textContent = films.people;
//         people.append(list);

//         let review = document.querySelector(".review");
//         let input = document.querySelector("#input.value")
//         newReview.append(input)
//         let newReview = document.querySelector("#review")
       
//       });
//   });
  
} //function end

// // This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// // So that testing can work as expected for now
// // A non-hacky solution is being researched
// // let movie = document.createElement("option")
// //         movie.innerText = flim.title
// //         tag.value = flim.id
// //         dropdown.append(tag)
// //         console.log(flim.title)
setTimeout(run, 1000);
