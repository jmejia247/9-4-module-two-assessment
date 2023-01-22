





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 let titles = document.querySelector("#titles");
 let displayInfo = document.querySelector("#display-info");
 let reviewForm = document.querySelector("section form");
 let reviewList = document.querySelector("#reviews ul");
 let resetReview = document.querySelector("#reviews button");
 let addPeople = document.querySelector("#show-people");
 let orderList = document.querySelector("#ol");
 addPeople.before(orderList);

 fetch("https://resource-ghibli-api.onrender.com/films")
 .then(response => response.json())
 .then (response => {
     console.log(response)
     response.forEach(movie => {
         let option = document.createElement("option");
         option.setAttribute("value" , `${movie.title}`);
             option.innerHTML = movie.title;
             titles.append(option)
     })

     titles.addEventListener("change", (event) => {
         event.preventDefault();

         response.forEach(movie => {
             if(titles.value === movie.title){
                 displayInfo.innerHTML = "";

                 const title = document.createElement("h3")
                 const releaseDate = document.createElement("p");
                 const description = document.createElement("p");

                 title.innerText = movie.title;
                 displayInfo.append(title);

                 releaseDate.innerText = movie.release_date;
                 displayInfo.append(releaseDate);

                 description.innerText = movie.description;
                 displayInfo.append(description);
             }
         })
     })

     reviewForm.addEventListener("submit", (event) => {
         event.preventDefault();
         if(titles.value === ""){
             alert("Please select a movie first")
         }
         else{
         const typedReview = document.querySelector("#review");
         review = document.createElement("li");
         review.innerHTML = `<strong>${titles.value}:</strong> ${typedReview.value}`
         reviewList.append(review);
         typedReview.value = "";
         }
     })

     resetReview.addEventListener("click", (event) => {
         event.preventDefault();
         reviewList.innerHTML = "";

     })

     addPeople.addEventListener("click", (event) => {
        event.preventDefault();
        orderList.innerHTML = "";

         fetch('https://resource-ghibli-api.onrender.com/people')
         .then(response => response.json())
         .then(response => {
             for(let movie of response){

                 if(titles.value === movie.title){
                         console.log(movie.id);
                         for(let person of response){
                             personId = person.films[0].split("/")
                             if(movie.id === personId[personId.length-1]){
                                 const li = document.createElement("li");
                                 orderList.append(li);
                                 li.innerText = person.name;
                             }
                         }

                     }
                 }

         })
     })
 })
 .catch(console.log)
}
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
