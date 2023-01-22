





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
// Add code you want to run on page load here

    //fetch the api
    fetch('https://resource-ghibli-api.onrender.com/films/')
    .then(res => res.json())
    .then(res => {

    //get the dropdown box
    let titles = document.getElementById("titles");

    //loop through the movies
    res.forEach(movie => {
        //create an option
        let movieOption = document.createElement("option");
        //set the value and text of the option to the movie title
        movieOption.text = movie.title;
        movieOption.value = movie.title;
        //append the option to the titles selection box
        titles.append(movieOption);
    });



    




    //.then ends here
    })

    
















//function ends here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
