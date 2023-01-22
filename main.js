





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run(movies) {
 // Add code you want to run on page load here
 let movieObject = {
    title: movies.title[0].value
 }
 let URL = movies.target.title.value
 let selectMovie = document.querySelector('option')
 let form = document.querySelector('form')
 let ol = document.querySelector('ol')
 let reviews = document.querySelector('.reviews')
 selectMovie.innerHTML = movieObject.title
}
// fetch(`https://resource-ghibli-api.onrender.com/${URL}films`).then(result =>{
//    return result.json()
// })
//Trying to use some code from the weather project
// if (previous.textContent === 'No previous searches.'){
//     previous.remove()
//     let li = document.createElement('li');
//     li.innerHTML = `<a href="file:///Users/carinamerced/hdml/8-3-weather-app-project/index.html#${weather.nearest_area[0].areaName[0].value}">${weather.nearest_area[0].areaName[0].value}</a>`;
//     ul.appendChild(li)
// }else{
//     let li = document.createElement('li');
//     li.innerHTML = `<a href="file:///Users/carinamerced/hdml/8-3-weather-app-project/index.html#${weather.nearest_area[0].areaName[0].value}">${weather.nearest_area[0].areaName[0].value}</a>`;
//     ul.appendChild(li)
// }

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
