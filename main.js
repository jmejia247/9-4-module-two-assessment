// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
const select = document.querySelector('select'); 

const options = document.querySelectorAll('option');

const input = document.getElementById('review');

const reviewsSect = document.querySelector('.user-review');

function theFetch() { fetch(`https://resource-ghibli-api.onrender.com/films`)
    .then((response) => response.json())
    .then((data) => {

        for (let title of data) {
            const option = document.createElement('option');
            option.setAttribute('value', title.id);
            option.textContent = title.title;
            select.appendChild(option);
        }

        select.addEventListener('change', (event) => {
            const h3 = document.createElement('h3');
            p2 = document.createElement('p');
            p = document.createElement('p');
            document.getElementById('display-info').appendChild(h3);
            document.getElementById('display-info').appendChild(p2);
            document.getElementById('display-info').appendChild(p); 
             
            h3.innerText = select.options[select.selectedIndex].text; 
    
            for (let title of data) {
                if (title.id === select.options[select.selectedIndex].value) {
                    p2.innerText = title.release_date
                    p.innerText = title.description;   
                }
            }

            select.addEventListener('change', (event) => {
                if (h3.innerText != select.options[select.selectedIndex].text) {
                    document.getElementById('display-info').innerText = '';
                }
            })
        })
        
    }).catch(error => {
        console.log(error)
    });
}

function run() {
    theFetch();
}

setTimeout(run, 1000);

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    if (select.options[select.selectedIndex].text < 1) {
        window.alert(`Please select a movie first`);
    }

    else {
    const userInput = event.target.review.value //succesfully grbbing user input
    
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    reviewsSect.appendChild(ul);
    ul.appendChild(li);
    li.innerHTML = `<strong>${select.options[select.selectedIndex].text}:</strong> ${userInput}`;
    form.reset()

    document.querySelector('#reset-reviews').addEventListener('click'), (event) => {
        event.preventDefault();
        
         ul.innerText = ''
    }
    }
})






