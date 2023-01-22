/*   Include the following:
error handling
consider: addEventListener for change
*/

// To ensure Cypress tests work as expected, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here

//fetch, then take the fetch and populate the dropdown

fetch(`https://resource-ghibli-api.onrender.com/films`)
    .then((response) => response.json())
    .then(movies => {
        console.log("fetch success! data is", movies)
        let dropdown = document.getElementById("titles")
        for(i=0; i<movies.length; i++){
            const movieOptions = document.createElement("options");
            movieOptions.innerText = movie.title
            movieOptions.value = movie.id
            dropdown.append(movieOptions)
            
        }
    })



//console.log(response)
//console.log(data)
//console.log(data.response)
//console.log(data.response.title)
//console.log(data.results.title)
// data.results.forEach((id) => {
  //  console.log(id)

const titleH3 = document.querySelector("h3")
const yearP = document.querySelector("p.displayP1")
const describeP = document.querySelector("p.displayP2")


//console.log(movieOptions.innerText=films.title)
//console.log(movieOptions.value=films.id)
//    console.log(dropdown.append(movieOptions))

//then to get people,I want to fetch 
// fetch (`https://resource-ghibli-api.onrender.com/films/title`)
//     .then(result => result.json())
//     .then(data2=> console.log("second fetch successful 2nd data is ", data2))

    let peopleOptions = document.createElement("li")
  //  document.getElementbytag("ol").append(peopleOptions)
    //peopleOptions.innerText=films.title.pepple
    //peopleOptions.value=films.title.pepple
    //dropdown.append(peopleOptions)

// document.getElementById("review").addEventListener("submit",function(){ document.getElementById



document.getElementById("reviewSubmit").addEventListener("submit",function(){
  
    try {
        if(getElementBytag("h3")==""){
            return "Please pick a movie"
        };
    } catch (error) {
        console.error(error);
    }
    let nextReview = document.createElement("p");
    let movieReviewed= document.getElementById("displayH3")
    nextReview.innerHTML=`${movieReviewed}: ${document.getElementsByID("review")}`
    reviewSection.append(nextReview)
})}


document.getElementById("reset-reviews").addEventListener("click",function(){})
 
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
