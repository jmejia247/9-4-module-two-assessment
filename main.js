/*   Include the following:
error handling
consider: addEventListener for change
*/

// To ensure Cypress tests work as expected, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here

    let dropdown = document.getElementById("titles")
    //dropdown = ""

        // document.querySelector("form").addEventListener("onload", (e) => {
        //     e.preventDefault();
        //     console.log(`https://resource-ghibli-api.onrender.com/films`, "Made it!"
        //     );

/* standard fetch set up is: 
fetch()
.then((response) => response.json())
.then((data => console.log(data))    */ 

//fetch, then take the fetch and populate the dropdown

fetch(`https://resource-ghibli-api.onrender.com/films`)
    .then((response) => response.json())
    .then((data => console.log("fetch success! data is", data)))
}

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

let movieOptions = document.createElement("options");
//movieOptions.innerText=films.title
//movieOptions.value=films.id
//dropdown.append(movieOptions)


//console.log(movieOptions.innerText=films.title)
//console.log(movieOptions.value=films.id)
//    console.log(dropdown.append(movieOptions))

//then to get people,I want to fetch 
fetch (`https://resource-ghibli-api.onrender.com/films/title`)
    .then(result => result.json())
    .then(data2=> console.log("second fetch successful 2nd data is ", data2))

    let peopleOptions = document.createElement("options");
    //peopleOptions.innerText=films.title.pepple
    //peopleOptions.value=films.title.pepple
    //dropdown.append(peopleOptions)

document.getElementById("review").addEventListener("click",function(){
    document.getElementById
})
 
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
