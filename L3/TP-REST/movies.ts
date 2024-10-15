import express from "express";
import { getMovies } from "../models/movies";

const router = express.Router();

router.get("/movies",async (req, res) => {
    const query  = req.query.query;
    
    //@ts-ignore
    const movies = await getMovies({query});
    res.json(movies);
})

export default router;
