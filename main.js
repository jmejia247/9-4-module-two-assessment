





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here

 //------------------------------DEFINE STARTER VARIABLES-------------------
 console.log('js is connected')
 const URL = 'https://resource-ghibli-api.onrender.com'
 let ol = document.querySelector('.list ol')
 let dropDown = document.querySelector('#titles')

 //--------------------------------CREATE INTITAL FETCH REQUEST---------------
 fetch(`${URL}/films`)
.then(resp => resp.json())
.then(data => {
    data.forEach(id => {
        // console.log(id.title)
        let dropDownItem = document.createElement('option');
        dropDownItem.innerText = id.title;
        dropDown.append(dropDownItem)

    });
})

//------------------------------DROPDOWN EVENT---------------------
dropDown.addEventListener('change', (event) => {
    event.preventDefault()
    ol.innerHTML = ""
    let selectedMovie = dropDown.value

    fetch(`${URL}/films`)
    .then(resp => resp.json())
    .then(data => {
        let titles = (data)
        // console.log(titles[0].title)

//-------------------------------GET MOVIE DATA---------------------   
function getData() {
    for(let i = 0; i<titles.length; i++){
if(titles[i].title == selectedMovie)
return (titles[i])
 }
}

let movieDetails = document.querySelector('#display-info')
movieDetails.innerHTML = ""
// button.innerHTML = ""

    let title = (getData().title)
    let titleHeader = document.createElement('h3')
    titleHeader.innerHTML = `${title}`


let description = (getData().description)
     let movieDescription = document.createElement('p')
    movieDescription.innerHTML = `${description}`


let release = (getData().release_date)
    let releaseDate = document.createElement('p')
    releaseDate.innerHTML = `${release}`

    movieDetails.append(titleHeader, releaseDate, movieDescription)
//-----------------------GET PEOPLE LIST EVENT-------------------
const button = document.querySelector('#show-people')

button.addEventListener('click', (event) =>{
    event.preventDefault()
    ol.innerHTML = ""
return populateList()
})

let peopleData = (getData().people)


function populateList() {peopleData.forEach(url => {
    fetch(URL+url)
    .then(resp => resp.json())
    .then(data => {
        let person = (data.name)
        let li = document.createElement('li')
        li.innerHTML = `${person}`
        ol.append(li)
    })
}
   
)}

const form = document.querySelector('#review')

form.addEventListener('submit', (event) => {
event.preventDefault()
console.log(form.value)



})
    
  })




})


}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
