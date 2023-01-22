





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    const dropdown = document.querySelector(".dropdown")
    const divH3 = document.querySelector("h3")
    const paragraph = document.querySelectorAll("p")
    const form = document.querySelector("form")
    const ul = document.querySelector("ul")
    const ol = document.getElementById("peeps")
    let peopleID = []
    let placeholder = ""
    fetch(`https://resource-ghibli-api.onrender.com/films`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        peopleID = []
        form.addEventListener("submit", (event) => {
            event.preventDefault()
            if(divH3.textContent === ''){  
                alert("Please select a movie first")
            } 
        })
        data.forEach(element => {
            let options = document.createElement("option")
            options.innerText = element.title
            options.value = element.id
            dropdown.append(options)
        })
        dropdown.addEventListener("change", (event) => {
            placeholder = ""
            for (let i = 0; i < data.length; i++){
            if(data[i].people.length > 1 && dropdown.value === data[i].id)
            peopleID.push(data[i].people)
            if(dropdown.value === data[i].id){  
              divH3.innerText = data[i].title
              paragraph[0].innerText = data[i].release_date
              paragraph[1].innerText = data[i].description
              placeholder = data[i].title
              console.log(placeholder)
            }
         }
         console.log(peopleID)
         form.addEventListener("submit", (event) => {
            event.preventDefault()
            let input = document.getElementById('review')
            if(input.value.length > 0 && placeholder.length > 1){
                let li = document.createElement("li")
                li.innerHTML = `<strong><b>${divH3.innerText}</strong></b>: ${input.value}`
                ul.appendChild(li)
                input.value = ""
             } 
        })
         document.getElementById("reset-reviews").addEventListener("click", (event) => {
            ul.innerHTML = ""
         })
        })
            document.getElementById("show-people").addEventListener("click", (event) => {
            fetch(`https://resource-ghibli-api.onrender.com/people`) 
            .then(response => response.json())
            .then(data2 => {
                console.log(data2)
                let arr = []
                let peeps = ""
                for(let i = 0; i < peopleID.length; i++) {
                    peeps = JSON.stringify(peopleID[i])
                    arr.push(peeps.replaceAll("/people/", ""))
                    console.log(arr)
                   }
                for(let i = 0; i < 57; i++){
                    if(arr.includes(data2[i].id)){
                        console.log("finally")
                        let li2 = document.createElement("li")
                        li2.innerHTML = data2[i].name
                        ol.append(li2)
                    }
                }
                })
        })
        })
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
