





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch("https://resource-ghibli-api.onrender.com/films")
    .then(response => response.json())
    .then (response => {
        console.log(response)
        response.forEach(movie => {
            let option = document.createElement("option");
            option.setAttribute("value" , `${movie.title}`);
                option.innerHTML = movie.title;
                titleSelect.append(option)
        })
    })

 // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
