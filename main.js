const mainURL = `https://resource-ghibli-api.onrender.com`
const dropdown = document.getElementById('titles')
const info = document.getElementById('display-info')
const showPeople = document.getElementById('show-people')
const people = document.querySelector('ol')
const form = document.querySelector('form')
const reviews = document.querySelector('ul')

function noSelection(){
    window.alert(`Please select a movie first`)
}

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 fetch(`${mainURL}/films`)
 .then((res)=> res.json())
 .then((films)=>{
    console.log(films)
    films.forEach((film) => {
        let name = document.createElement('option')
        name.innerText = film.title
        name.value = film.id
        dropdown.append(name)
    });

 })
 .catch((e)=>console.log(e))
}
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);

dropdown.addEventListener('change', (e)=>{
    e.preventDefault()
    info.innerHTML = ``
    people.innerHTML = ``
    console.log(dropdown.value)
    fetch(`${mainURL}/films/${dropdown.value}`)
    .then((res)=> res.json())
    .then((film)=>{
        if (dropdown.value == film.id){
            movieTitle = film.title
        }

        console.log(film)
        let title = document.createElement('h3')
        title.innerText = film.title
        info.append(title)

        let year = document.createElement('p')
        year.innerText = film.release_date
        info.append(year)

        let description = document.createElement('p')
        description.innerText = film.description
        info.append(description)

        form.addEventListener('submit', (e)=>{
            e.preventDefault()
            let input = e.target.review.value

            if (dropdown.value == ``){
                noSelection()
            } else {
                let li = document.createElement('li')
                if (input == ``){
                    li.innerHTML = ``
                } else {
                    li.innerHTML = `
                    <strong>${movieTitle}:</strong> ${input}
                    `
                    reviews.append(li)
                }
            }
            e.target.reset()
        })

        showPeople.addEventListener('click', (e)=>{
            e.preventDefault()
            people.innerHTML = ``
            for (let i = 0; i<film.people.length; i++){
                fetch(`${mainURL}${film.people[i]}`)
                .then((res)=> res.json())
                .then((person)=>{
                    console.log(person)
                    
                    let personName = document.createElement('li')
                    personName.innerText = person.name
                    people.append(personName)
                })
            }
            //person.innerText = 
        })
    })
})


