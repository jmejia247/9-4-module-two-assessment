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
        // movies.response.forEach(title => {
        // for(i=0; i<movies.length; i++){
            movies.forEach((movie) => {
            let movieOption = document.createElement("option");
            movieOption.innerText = movie.title
            movieOption.value = movie.id
            dropdown.append(movieOption)
});

//then to get people,I want to fetch 
    dropdown.addEventListener("change", (event) => {
        console.log("dropdown.id ",dropdown.id)
        console.log("dropwdown.name", dropdown.name)
        console.log("dropdown.value is" , dropdown.value)
        fetch (`https://resource-ghibli-api.onrender.com/films/${dropdown.value}`)
        .then(result => result.json())
        .then(people => {
            console.log("second fetch successful 2nd data is ", people)
            let dropdown2 = document.getElementsByTagName("ol");
            dropdown2.innerText = people.people;
            dropdown2.id = people.id
            dropdown.append(dropdown2)})

    // let peopleOptions = document.createElement("li")
    //     document.getElementbytag("ol").append(peopleOptions)
    //     peopleOptions.innerText=films.title.pepple
      //peopleOptions.value=films.title.pepple
      //dropdown.append(peopleOptions)
  



      const titleH3 = document.querySelector("h3")
      const yearP = document.querySelector("p.displayP1")
      const describeP = document.querySelector("p.displayP2")
  
      titleH3 = people.title
      yearP = people.release-date
      describeP = people.description






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
})


document.getElementById("reset-reviews").addEventListener("click",function(){})
 
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched
    })
})}

setTimeout(run, 1000);
