
// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    const URL = "https://resource-ghibli-api.onrender.com/films"
    const displayInfo = document.getElementById("display-info")
    const select = document.getElementById("select")
    const h2 = document.querySelector("h2")
    const review = document.getElementById("review")
    const reset = document.getElementById("reset-reviews")
    const ul = document.querySelector("ul")
    const submit = document.getElementById("submit")
    const showPeople = document.getElementById("show-people")
    const people = document.getElementById("people")

    console.log(select.value)

    submit.addEventListener("click", event => {
        event.preventDefault()
        if (h2.innerText === "Select a movie") {
            alert("Please select a movie first")
        }
    })



    fetch(
        `${URL}`
    ).then((response) => response.json()
    ).then((result) => {


        result.forEach(el => {
            let createOption = document.createElement("option")
            createOption.setAttribute("type", "submit")
            createOption.setAttribute("value", `${el.id}`)
            select.append(createOption)
            createOption.innerText = el.title
        })

    }).catch((error) => console.log(error))

    select.addEventListener("change", event => {
        let title = `/${event.target.value}`
        fetch(
            `${URL}${title}`
        ).then(response => response.json()
        ).then(result => {

            console.log(select.innerText)
            if (result.title) {
                h2.innerText = ""
            }

            displayInfo.innerHTML = `
            <h3 value="${result.id}">${result.title}</h3>
            <p>${result.release_date}</p>
            <p>${result.description}</p>
            `


        }).catch(error => console.log(error))

        submit.addEventListener("click", (event) => {
            let h3 = document.querySelector("h3")
            if (h3.innerText === "undefined") {
                alert("Please select a movie first")
            } else if (review.value) {
                ul.innerHTML += `
            <li><strong>${h3.innerText}:</strong> ${review.value}</li>
            `
                review.value = ""
            }


        })

        reset.addEventListener("click", event => {
            ul.innerHTML = ""

        })

        showPeople.addEventListener("click", event => {
            let h3 = document.querySelector("h3")
            let title = `/${h3.getAttribute("value")}`
            fetch(
                `${URL}${title}`
            ).then(response => response.json()
            ).then(result => {
                console.log(result)
                let ol = document.createElement("ol")
                people.append(ol)
                result.people.forEach(el => {
                    console.log(el)
                })
            }).catch(error => console.log(error))

        })


    })






    // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);



