





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {

    let titleSelect = document.querySelector("#titles");
    let movieInfo = document.querySelector("#display-info");
    let submitReview = document.querySelector("section form");
    let addReview = document.querySelector("#reviews ul");
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
                titleSelect.append(option)
        })

        titleSelect.addEventListener("change", (event) => {
            event.preventDefault();
   
            response.forEach(movie => {
                if(titleSelect.value === movie.title){
                    movieInfo.innerHTML = "";
   
                    const title = document.createElement("h3")
                    const releaseDate = document.createElement("p");
                    const description = document.createElement("p");
   
                    title.innerText = movie.title;
                    movieInfo.append(title);
   
                    releaseDate.innerText = movie.release_date;
                    movieInfo.append(releaseDate);
   
                    description.innerText = movie.description;
                    movieInfo.append(description);
                }
            })
        })
   
        submitReview.addEventListener("submit", (event) => {
            event.preventDefault();
            if(titleSelect.value === ""){
                alert("Please select a movie first")
            }
            else{
            const typedReview = document.querySelector("form input[type='text']");
            review = document.createElement("li");
            review.innerHTML = `<strong>${titleSelect.value}:</strong> ${typedReview.value}`
            addReview.append(review);
            typedReview.value = "";
            }
        })
   
        resetReview.addEventListener("click", (event) => {
            event.preventDefault();
            addReview.innerHTML = "";
   
        })
   
        addPeople.addEventListener("click", (event) => {
            ol.innerHTML = "";
   
            fetch("https://ghibliapi.herokuapp.com/people/")
            .then(resp => resp.json())
            .then(resp => {
                for( let movie of response){
   
                    if(titleSelect.value === movie.title){
                            console.log(movie.id);
                            for(let per of resp){
                                urlId = per.films[0].split("/")
                                if(movie.id === urlId[urlId.length-1]){
                                    const li = document.createElement("li");
                                    ol.append(li);
                                    li.innerText = per.name;
                                }
                            }
   
                        }
                    }
   
            })
        })
    })
    .catch(console.log)

 // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
