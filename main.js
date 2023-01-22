





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 let dropdown = document.querySelector(".dropdown")

fetch('https://resource-ghibli-api.onrender.com/people').then(response => response.json()).then(data => {
    // console.log(data.results)
    data.results.forEach(character => {
        // console.log(character)
        let tag = document.createElement("option")
        tag.innerText = character.name
        tag.value = character.id
        dropdown.append(tag)
    });
})

dropdown.addEventListener("change", (e) => {
    console.log(dropdown.value)

    fetch('https://resource-ghibli-api.onrender.com/people/${dropdown.value}').then(response => response.json()).then(people => {
        console.log(people)
        
    })
})
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
