import createMovieCard from "./movie-card.js"

async function main(){
    const input = document.querySelector('[data-search-input]');
    
    const movies = await getMovies(input.value);
    renderMovies(movies);
    
    input.addEventListener('input', async ()=>{
        const movies = await getMovies(input.value);
        renderMovies(movies);
    })
console.log(await getLibraryMovie(4));
}

async function getMovies(query){
    const response = await fetch(`/movies?query=${query}`);
    const movies = await response.json();
    return movies;
}
function renderMovies(movies) {
    const container = document.querySelector('div[data-movies]');
    container.innerHTML = "";
    movies.forEach(movie => {
        const movieCard = createMovieCard({movie});
        container.appendChild(movieCard);
    });
}

async function getLibraryMovie(movieId){
    const response = await fetch(`/library/${movieId}`)
    try {
        const libraryMovie = await response.json()
        return libraryMovie;
    } catch (error) {
        return false;
    }
}   

main();
