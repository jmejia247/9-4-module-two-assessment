


/*   Include the following:

error handling

consider: addEventListener for change
*/

//list all the titles or all the IDs?

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
       .then(response => {
           if(response.ok) {
               return response;
           }else{
               throw Error(`Request rejected with status ${response.stats}`);
           }
       })
       .catch(console.error)
       .then((response) => response.json())
       .then(data => 
           console.log(data))
       // console.log(data.response)
       // console.log(data.response.title)
       // console.log(data.results.title)
     //  data.results.forEach((id) => {
      //     console.log(id)
       })
   
   .then((response) => {
       response(json())
       .then(data=>{
       console.log("Fetch Success!");
       console.log(data.results)
   
   
       data.results.forEach(movie=>{
           console.log(movies)
           let tag=document.createElement
           tag.innerText=movie.title
       })
   
   
   
       const answer=response
       .json() //returns results translated by JSON
       .then
   })
   }
   
   )
   
   
   
   
   
   
   
   
   }
   
   // This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
   // So that testing can work as expected for now
   // A non-hacky solution is being researched
   
   setTimeout(run, 1000);
   