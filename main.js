// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
function run() {



    const BASE_URL = 'https://resource-ghibli-api.onrender.com/films';

    let dropdown = document.querySelector(".dropdown")

    fetch(`${BASE_URL}`)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        
        // data.results.forEach(character => {
        //     // console.log(character)
        //     let tag = document.createElement("option")
        //     tag.innerText = character.name
        //     tag.value = character.id
        //     dropdown.append(tag)
        // });
    })



    
            }
    // This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
    // So that testing can work as expected for now
    // A non-hacky solution is being researched
    
    setTimeout(run, 1000);