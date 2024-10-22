import createMovieCard from "./movie-card.js"

async function main(){
    const input = document.querySelector('[data-search-input]');
    
    const movies = await getMovies(input.value);
    renderMovies(movies);
    
    input.addEventListener('input', async ()=>{
        const movies = await getMovies(input.value);
        renderMovies(movies);
    })

}

async function getMovies(query){
    const response = await fetch(`/movies?query=${query}`);
    const movies = await response.json();

    const librairies = await Promise.all(movies.map(movie => {
        return getLibraryMovie(movie.id);
    }))

    for (let index = 0; index < librairies.length; index++) {
        const library = librairies[index];
        const movie = movies[index];
        if (library != false) {
            movie["isInLibrary"] = true;
            movie["rating"] = library.rating;
        }      
        else {
            movie["isInLibrary"] = false;
        }
    }

    return movies;
}
function renderMovies(movies) {
    const container = document.querySelector('div[data-movies]');
    container.innerHTML = "";
    movies.forEach(movie => {
        const movieCard = createMovieCard({movie, onAddToLibrary : addMovieToLibrary, onRemoveFromLibrary : removeFromLibrary, onRatingChange : updateRating});
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

async function addMovieToLibrary(movieId){
    await fetch("/library",{
        method: "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            LibraryMovie : {movieId : movieId}
        })
    })
}

async function removeFromLibrary(movieId){
    await fetch(`/library/${movieId}`, {
        method: "DELETE",
        headers : {
            "Content-Type" : "application/json"
        },
    })
}

async function updateRating(movieId, rating){
    await fetch(`/library/${movieId}`,{
        method:"PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            rating : rating
        })
    })
}

main();
