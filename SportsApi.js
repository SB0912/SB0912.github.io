const container = document.querySelector('container');
const search = document.querySelector('div.search-box button');
const leagueBox = document.querySelector('container');
const teamDetails = document.querySelector('container');
const error404 = document.querySelector('container');
const searchInput = document.querySelector('div.search-box input')

searchInput.addEventListener('search', () => {
    console.log(searchInput.value);
});


search.addEventListener('click', () => {
    const name = document.querySelector('div.search-box input').value;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a2b701b96emshe26367aca2a96d1p12a3d3jsn060c988c39e7',
            'X-RapidAPI-Host': 'sofasport.p.rapidapi.com'
        }
    };

    fetch('https://sofasport.p.rapidapi.com/v1/search/suggest?query=${}', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
});

// const team = document.querySelector('.search-box input').value;

// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'a2b701b96emshe26367aca2a96d1p12a3d3jsn060c988c39e7',
//         'X-RapidAPI-Host': 'sofasport.p.rapidapi.com'
//     }
// };

// if(team === ''){
//     return;
// }

// fetch('https://sofasport.p.rapidapi.com/v1/search/suggest?query=${team}', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err))
// .then(json => {
//     if (json.cod === '404') {
//         container.style.height = '400px';
//         leagueBox.style.display = 'none';
//         teamDetails.style.display = 'none';
//         error404.style.display = 'block';
//         error404.classList.add('fadeIn');
//         return;
//     }
// })