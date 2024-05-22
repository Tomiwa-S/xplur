'use client'
import {discoverMovies, discoverTV }from './server/tmdb'
import { lazy, useEffect, useState } from 'react'
import Show from './components/show';
import Navbar from './components/Navbar';
import Welcome from './components/welcome';
import { number } from './server/tmdb';
import ShowSlideSkeleton from './skeletons/show-slide-skeleton';
import ExploreBtn from './components/explore';
import Footer from './components/footer';


export default function Home() {
const [discoverMovie, setDiscoverMovies] = useState([]);
const [loaded, setLoaded] = useState(false);
const [discoverTVSeries, setDiscoverTVSeries] = useState([])
const types = [{type:'movie', id: discoverMovie && discoverMovie?.map(x=>x?.id)},
                {type:'tv', id: discoverTVSeries && discoverTVSeries?.map(x=>x?.id)}];
                
  useEffect( ()=>{
    discoverMovies().then(movies=>{
      setDiscoverMovies(prev=>movies?.results)
    });
    discoverTV().then(series=>{
      setDiscoverTVSeries(series?.results)});
      setLoaded(true)
  },[])
  
  return (
    <>
    <Navbar/>
    <Welcome {...types[number()]}/>
    <h2 style={{margin:"4rem 0 1rem 3rem"}}>Trending Movies</h2>
    <div className='show-slide'>
      {!loaded && <ShowSlideSkeleton/>} 
      {discoverMovie ? discoverMovie?.map((movie,i)=><Show key={i} {...movie}/>) : <ShowSlideSkeleton/>}
    </div>

    <ExploreBtn link="explore/movie"/>
    <h2 style={{margin:"0 0 1rem 3rem"}}>Hottest Series</h2>
    <div className='show-slide'>
      {!loaded && <ShowSlideSkeleton/>} 
      {discoverTVSeries && discoverTVSeries.map((series, i)=><Show key={i} {...series}/>)}
    </div>
    <ExploreBtn link="explore/tv"/>
    <Footer/>
    </>
  )
}