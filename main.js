const select = document.querySelector('select')
const form = document.querySelector('form')
const showPeople = document.getElementById('show-people')
let currentTitle
let currentPeople
const fetchData = async (type, id) => {
  const res = await fetch(
    `https://resource-ghibli-api.onrender.com${type}/${id ? id : ''}`
  )
  const data = await res.json()
  if (data) {
    if (type === '/films' && !id) {
      selectInitialization(data)
      console.log(data)
    } else return data
  } else {
    throw 'something went wrong!'
  }
}
const selectInitialization = films => {
  if (select.length === 1) {
    films.forEach(e => {
      const option = document.createElement('option')
      option.setAttribute('value', e.id)
      option.innerText = e.title
      select.append(option)
    })
  }
}
const displayName = async name => {
  const reg = /[0-9]/
  if (reg.test(name)) {
    const people = await fetchData(name)
    const li = document.createElement('li')
    li.innerText = people.name
    document.querySelector('ol').append(li)
  } else {
    const li = document.createElement('li')
    li.innerText = name
    document.querySelector('ol').append(li)
  }
}
// Event Listeners
select.addEventListener('change', async () => {
  const film = await fetchData('/films', select.value)
  showPeople.style.display = 'inline'
  document.querySelectorAll('ol li').forEach(e => e.remove())
  currentTitle = `${film.title}: `
  currentPeople = film.people
  document.querySelector('#display-info').remove()
  const details = document.createElement('div')
  details.setAttribute('id', 'display-info')
  //   const img = document.createElement('img')
  //   img.setAttribute('src', film.movie_banner)
  const h3 = document.createElement('h3')
  const p_1 = document.createElement('p')
  const p_2 = document.createElement('p')
  h3.innerText = film.title
  p_1.innerText = `${film.release_date}\n`
  p_2.innerText = film.description
  details.append(h3, p_1, p_2)
  document.getElementById('movie-details').append(details)
})

form.addEventListener('submit', e => {
  e.preventDefault()
  if (!select.value) {
    alert('Please select a movie first')
  } else {
    const reviews = document.getElementById('reviews-list')
    const li = document.createElement('li')
    const title = document.createElement('strong')
    title.innerText = currentTitle
    li.innerText = e.target.review.value
    li.prepend(title)
    reviews.append(li)
    e.target.review.value = ''
  }
})
document.getElementById('reset-reviews').addEventListener('click', () => {
  document.getElementById('reviews-list').remove()
  const ul = document.createElement('ul')
  ul.setAttribute('id', 'reviews-list')
  document.getElementById('reviews').append(ul)
})
showPeople.addEventListener('click', async () => {
  showPeople.style.display = 'none'
  if (currentPeople.length === 1 && currentPeople[0] === '/people/') {
    const people = await fetchData('/people/')
    people.forEach(e => displayName(e.name))
  } else {
    currentPeople.forEach(e => {
      displayName(e)
    })
  }
})

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  fetchData('/films')
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000)
