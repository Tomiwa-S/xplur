import { getFetch } from "./tmdb";

async function explore(type = "movie",page=1){
    const urlMovie = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
    const urlSeries = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`;
    if(type=="movie") return await getFetch(urlMovie);
    return await getFetch(urlSeries);
}

export {explore}