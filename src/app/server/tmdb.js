
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWM3ZWE2YTVjZGFjMTE1MzFkMDRkYWU0Mzc3YjE4YiIsInN1YiI6IjY0ZjI0NWRlOTQwOGVjMDBjNmJkNTJkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MGKavoCiMRUnKd-QZjdj91pAocYEviqHCDXlUt5r6J0'
    }
    };
async function getFetch(url){
    return fetch(url, options)
    .then(res => res.json())
    .then(json => {
    return json})
    .catch(err => console.error('error:' + err));
}
async function discoverMovies(page=1){
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc`;
    return await getFetch(url);
}
async function discoverTV(page=1){
    const url = `https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`;
    return await getFetch(url);
}

async function getMovie(id){
    const url = `https://api.themoviedb.org/3/movie/${id}`;
    return await getFetch(url);
}

async function getSeries(id){
    const url = `https://api.themoviedb.org/3/tv/${id}`
    return await getFetch(url);
}

async function getMovieTrailer(id){
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    return await getFetch(url)
}

async function getTvSeriesTrailer(id){
    const url = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;
    return await getFetch(url)
}

async function getMovieCast(id){
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
    return await getFetch(url);
}

async function getSeriesCast(id){
    const url = `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`;
    return await getFetch(url)
}

async function getSimilarTvSeries(id, page=1){
    const url = `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=${page}`;
    return await getFetch(url);
}

async function getSimilarMovies(id, page=1){
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`;
    return await getFetch(url);
}

async function getMovieReview(id, page =1){
    const url = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=${page}`;
    return await getFetch(url);
}
function getTvSeriesReview(id, page =1){
    const url = `https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US&page=${page}`;
    return getFetch(url);
}

async function getMovieWatchProvider(id){
    const url = `https://api.themoviedb.org/3/movie/${id}/watch/providers`;
    return await getFetch(url).then(response=>{
        if(response?.results){
            const firstkey = Object.keys(response?.results)[0];
            return response?.results[firstkey]};
        })
}

async function getTvSeriesWatchProvider(id){
    const url = `https://api.themoviedb.org/3/tv/${id}/watch/providers`;
    return await getFetch(url).then(response=>{
        if(response?.results){
            const firstkey = Object.keys(response?.results)[0];
            return response?.results[firstkey]};
        })
}

async function searchMovies(name, page=1){
    const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=true&language=en-US&page=${page}`;
    return await getFetch(url);
}

async function getWelcomeImage(show){
    const type = show?.type;
    const id = show?.id;
    const response = [];
    for(let i=0;i<id.length;i++){
        const url = `https://api.themoviedb.org/3/${type}/${id[i]}/images`;
        const result = await getFetch(url);
        response.push(result);
    }
    return response;
}
function number(){
    return Math.floor(Math.random()*2);
}
export  {discoverMovies, discoverTV, getMovie,
         getSeries, getMovieTrailer, getTvSeriesTrailer,
         getMovieCast, getSeriesCast, getSimilarTvSeries,
         getSimilarMovies, getMovieReview, getTvSeriesReview,
         getMovieWatchProvider, getTvSeriesWatchProvider, searchMovies,
         getWelcomeImage, number, getFetch, options
         };