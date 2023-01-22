





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 const body = document.querySelector('body');
 const header = document.createElement('header');
 body.append(header)
const PEOPLE_URL = "https://resource-ghibli-api.onrender.com/people"
 

 let headerImg = document.createElement('img');
 headerImg.setAttribute('src', './images/ghibli-logo.png');
 headerImg.setAttribute('alt', 'Ghibli logo')
 header.appendChild(headerImg);

 let headerH1 = document.createElement('h1');
 headerH1.textContent = 'Ghibli Review App';
 headerImg.after(headerH1);

 const main = document.createElement('main');
 header.after(main);

 let section = document.createElement('section');
 main.appendChild(section);

 let sectionH2 = document.createElement('h2');
 sectionH2.textContent = 'Select a movie';
 section.appendChild(sectionH2)

 let select = document.createElement('select')
 select.setAttribute('class', 'dropdown');
 select.setAttribute('id', 'titles');
 sectionH2.after(select);

 let option1 = document.createElement('option');
 option1.textContent = '';
 select.append(option1)
//  let options = document.createElement('option');
//  options.textContent = ''
//  select.appendChild(options)

 fetch(`https://resource-ghibli-api.onrender.com/films`)
 .then(response => response.json())
 .then(movies => {
    console.log('success!')
    movies.forEach((movie) => {
        let options = document.createElement('option');
        options.setAttribute('value', `${movie.id}`)
        //options.value = movie.id
        //console.log(options.value)
        options.innerText += movie.title
        option1.after(options)
       
    })
 })

 


 let section2 = document.createElement('section');
 section.after(section2);

 let section2H2 = document.createElement('h2')
 section2H2.textContent = 'Add a review';
 section2.appendChild(section2H2);

 let reviewForm = document.createElement('form')
 section2H2.appendChild(reviewForm);

 let reviewLabel = document.createElement('label');
 reviewLabel.setAttribute('for', 'review');
 reviewLabel.innerHTML = 'Your review: <br>';
 reviewForm.appendChild(reviewLabel);

 let typeText = document.createElement('input');
 typeText.setAttribute('id', 'review');
 typeText.setAttribute('type', 'text');

 reviewLabel.after(typeText);

 let typeSubmit = document.createElement('input');
 typeSubmit.setAttribute('type', 'submit');
 typeText.after(typeSubmit);



 document.querySelector('input[type=submit]').addEventListener('click', (event) => {
    event.preventDefault()
    fetch(`https://resource-ghibli-api.onrender.com/films/${select.value}`)
    .then(response => response.json())
    .then(movies => {
    console.log(select.value)
   
    if(select.value === ''){
        alert("Please select a movie first");
    }
   
  
    console.log(typeText.value)
    let reviewUL = document.createElement('ul')
    reviewForm.after(reviewUL)
    let reviewSub = document.createElement('li');
    reviewUL.appendChild(reviewSub)
     let reviewSubtext= movies.title + ' ' + typeText.value 
     reviewSubtext.style
     console.log(reviewSubtext)
     reviewSub.appendChild(document.createTextNode(reviewSubtext))
})
 })

 let section3 = document.createElement('section');
 section2.after(section3);

 let section3H2 = document.createElement('h2');
 section3H2.textContent = 'Movie details';
 section3.appendChild(section3H2);

 let section3Div = document.createElement('div');
 section3Div.setAttribute('id', 'display-info');
 section3H2.after(section3Div);

console.log(select.value)
 select.addEventListener('change', (event) => {
    const test = event.target;
    const value = test.value;
    const desc = test.selectedOptions[0].text;
    fetch(`https://resource-ghibli-api.onrender.com/films/${select.value}`)
    .then(response => response.json())
    .then(movies => {
       console.log('success!')
        let newDiv = document.getElementById('display-info');
        newDiv.innerHTML = ''
         
        let movieDetailsT = document.createElement('h3');
        movieDetailsT.textContent = movies.title;
        section3Div.prepend(movieDetailsT)

        let movieDetailsP = document.createElement('p');
        movieDetailsP.textContent = movies.release_date;
        movieDetailsT.after(movieDetailsP)

        let movieDetailsP2 = document.createElement('p');
        movieDetailsP2.textContent = movies.description;
        movieDetailsP.after(movieDetailsP2);
        
        

       })
 })

 let section4 = document.createElement('section');
 section3.after(section4);

 let section4H2 = document.createElement('h2');
 section4H2.textContent = 'People';
 section4.appendChild(section4H2);

 let section4Ol = document.createElement('ol');
 section4H2.after(section4Ol);

 let section4Btn = document.createElement('button');
 section4Btn.setAttribute('id', 'show-people');
 section4Btn.textContent = 'Show People';
 section4Ol.after(section4Btn);

 let section5 = document.createElement('section');
 section5.setAttribute('id', 'reviews');
 section4.after(section5);

 let section5H2 = document.createElement('h2');
 section5H2.textContent = 'Reviews';
 section5.appendChild(section5H2);

 let section5Ul = document.createElement('ul');
 section5H2.after(section5Ul);

 let section5Btn = document.createElement('button');
 section5Btn.setAttribute('id','reset-reviews');
 section5Btn.textContent = 'Reset Reviews';
 section5Ul.after(section5Btn);

 section4Btn.addEventListener('click', (event) => {
    event.preventDefault()
    fetch(`https://resource-ghibli-api.onrender.com/films/${select.value}`)
    .then(response => response.json())
    .then(movies => {
       console.log(select.value)
        if(select.value === movies.id){
            console.log(movies.people[0])
        }
     
       let section4Li = document.createElement('li');
       section4Ol.appendChild(section4Li)
        let section5LiText= movies.people
        console.log(section5LiText)
        section4Li.appendChild(document.createTextNode(section5LiText))

        
        

       })
 })
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
