const maxPokedex = 807 // Only has pictures up to 802 and 807 is the current max
let apiData = {}, pokemonDiv, tempPokeData, pokedexID

function init() {
    const html = ''
    pokemonDiv = document.querySelector('.pokedex')
    pokemonDiv.innerHTML = html
    pokedexID = Math.floor(Math.random() * Math.floor(maxPokedex));
}

document.querySelector('.newPokemon').addEventListener('click', () => {

    init()

    apiData = {
        url: 'https://pokeapi.co/api/v2/',
        type: 'pokemon',
        id: pokedexID
    }

    const {url, type, id} = apiData
    const apiUrl = `${url}${type}/${id}`

    fetch(apiUrl)
        .then( (data) => data.json() )
        .then( (pokemon) => generateHTML(pokemon) )
        // .then( (pokemon) => borderColor(pokemon) )

    document.querySelector('.guessInput').style.display = 'none';
})

document.querySelector('.guessUsingImage').addEventListener('click', () => {

    init()

    apiData = {
        url: 'https://pokeapi.co/api/v2/',
        type: 'pokemon',
        id: pokedexID
    }

    const {url, type, id} = apiData
    const apiUrl = `${url}${type}/${id}`

    fetch(apiUrl)
        .then( (data) => data.json() )
        .then( (pokemon) => getPokemonImage(pokemon) )

    document.querySelector('.guessInput').style.display = 'block';

})

document.querySelector('.guessUsingStats').addEventListener('click', () => {

    init()

    apiData = {
        url: 'https://pokeapi.co/api/v2/',
        type: 'pokemon',
        id: pokedexID
    }

    const {url, type, id} = apiData
    const apiUrl = `${url}${type}/${id}`

    fetch(apiUrl)
        .then( (data) => data.json() )
        .then( (pokemon) => getPokemonStats(pokemon) )

    document.querySelector('.guessInput').style.display = 'block';
})

const generateHTML = (data) => {
    const html = `
        <div class="name">${data.name}</div>
        <img src=${data.sprites.front_default}>
        <div class="details">
            <span>Height: ${data.height}</span>
            <span>Weight: ${data.weight}</span>
        </div>
    `
    pokemonDiv = document.querySelector('.pokedex')
    pokemonDiv.innerHTML = html
}

const getPokemonImage = (data) => {
    tempPokeData = data
    const html = `
        <img src=${data.sprites.front_default}>
    `
    pokemonDiv = document.querySelector('.pokedex')
    pokemonDiv.innerHTML = html
}

const getPokemonStats = (data) => {
    tempPokeData = data
    let statistics = ``
    let pokeTypes = ``, types = ``
    for(let i=0; i < data.stats.length; i++) {
        statistics += `<div>${data.stats[i].stat.name}: ${data.stats[i].base_stat}</div>`
    }
    for(let i=0; i < data.types.length; i++) {
        pokeTypes += `${data.types[i].type.name}, `
        if (pokeTypes.endsWith(", ")) {
            types = pokeTypes.substring(0, pokeTypes.length - 2);
        }
    }
    const html = `
        <div class="stats">
            <div>Stats</div>
            ${statistics}
            <div>Type: ${types}</div>
            <span>Height: ${data.height}</span>
            <span>Weight: ${data.weight}</span>
        </div>
    `
    pokemonDiv = document.querySelector('.pokedex')
    pokemonDiv.innerHTML = html
}

function pokemonGuess() {
    const guess = document.getElementById("guessedPokemon").value
    if(guess.toLowerCase() === tempPokeData.name.toLowerCase()) {
        console.log("CORRECT")
    } else {
        console.log("TRY AGAIN")
    }
}

// function borderColor(pokemon) {
//     const typeColor = [
//         {normal: '#a8a878'},
//         {water: '#6890f0'},
//         {electric: '#f8d030'},
//         {fighting: '#c03028'},
//         {ground: '#e0c068'},
//         {psychic: '#f85888'},
//         {rock: '#b8a038'},
//         {dark: '#705848'},
//         {steel: '#b8b8d0'},
//         {fire: '#f08030'},
//         {grass: '#78c850'},
//         {ice: '#98d8d8'},
//         {poison: '#a040a0'},
//         {flying: '#a890f0'},
//         {bug: '#a8b820'},
//         {ghost: '#705898'},
//         {dragon: '#7038f8'},
//         {fairy: '#f0b6bc'}
//     ]
//     if(pokemon.data.types.length === 2) {
//         typeColor.find(color => color === pokemon.data.types[0])
//         document.querySelector('.pokedex').style.border-left-color = 
//         document.querySelector('.pokedex').style.border-top-color = 
//         document.querySelector('.pokedex').style.border-right-color = 
//         document.querySelector('.pokedex').style.border-bottom-color = 
//     } else if (pokemon.data.types.length === 4) {
//         document.querySelector('.pokedex').style.border-left-color = 
//         document.querySelector('.pokedex').style.border-top-color = 
//         document.querySelector('.pokedex').style.border-right-color = 
//         document.querySelector('.pokedex').style.border-bottom-color = 
//     } else {
//         document.querySelector('.pokedex').style.border-color = 
//     }
// }