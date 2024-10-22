import express from "express";
import { addMovieToLibrary, getLibraryMovieById, getLibraryMovies, modifyLibraryMovie, removeMovieFromLibrary } from "../models/library";

const router = express.Router();

router.get("/library/:movieId",async (req,res) => {
    const id = req.params.movieId;
    
    try {
        const movie = await getLibraryMovieById(id);
        res.json(movie);
    } catch (error) {
        res.sendStatus(404);
    }
});

router.get("/library", async (req,res) => {
    try {
        const movies = await getLibraryMovies();
        res.json(movies);
    } catch (error) {
        res.sendStatus(500);
    }

})

router.post("/library", async (req, res)=>{
    const LibraryMovie = req.body.LibraryMovie;
    try {
        const movie = await addMovieToLibrary(LibraryMovie);
        res.json(movie);
    } catch (error) {
        res.sendStatus(400);
    }
});

router.delete("/library/:movieId", async (req, res)=>{
    const id = req.params.movieId;
    
    try {
        await removeMovieFromLibrary(id);
        res.end("Le film a bien été supprimé de la bibliothèque");
    } catch (error) {
        res.sendStatus(404);
    } 
});

router.put("/library/:movieId", async (req, res)=>{
    const id = req.params.movieId;
    const rating : number = req.body.rating;
    const LibraryMovie = {movieId : id, rating};
    try {
        await getLibraryMovieById(id);
        await modifyLibraryMovie(id, LibraryMovie);
        res.end("Note du film modifiée");
    } catch (error) {
        res.sendStatus(404);
    }

})

export default router;
