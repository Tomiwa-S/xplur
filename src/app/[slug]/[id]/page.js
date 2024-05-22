'use client';
import { useState, useEffect } from "react";
import { getMovie, getSeries,getMovieTrailer,
         getTvSeriesTrailer, getMovieCast,
         getSeriesCast, getSimilarTvSeries,
         getSimilarMovies, getMovieReview, getTvSeriesReview,
         getMovieWatchProvider, getTvSeriesWatchProvider,
           } from "@/app/server/tmdb";
import Show from "@/app/components/show";
import Image from "next/image";
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import Cast from "@/app/components/cast";
import Button from '@mui/material/Button';
import Review from "@/app/components/review";
import { Skeleton } from "@mui/material";
import './page.css';
import Navbar from "@/app/components/Navbar";
import { Suspense } from "react";
import Footer from "@/app/components/footer";


export default function Page({params}){
    const [show, setShow] = useState(false);
    const [trailer, setTrailer] = useState(false);
    const [cast, setCast] = useState(false);
    const [similar, setSimilar] = useState(false);
    const [open, setOpen] = useState(false);
    const [reviews, setReviews] = useState(false);
    const [watchProviders, setWatchProviders] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loaded, setLoaded] = useState(false);
    const [posterLoaded, setPosterLoaded] = useState(false);
    const [posterError, setPosterError] = useState(false);
    const handlePosterError = ()=>setPosterError(true);
    const handleLoading = ()=>setLoaded((prev)=>true);
    const [backdropError, setBackdropError] = useState(false);
    const baseURL ='https://image.tmdb.org/t/p/';
    const original = 'original';
    const youtube = "https://www.youtube.com/embed/"
    const type = params.slug;
    const id = params.id;
    useEffect(()=>{
        if(type=='movie'){
            getMovie(id).then(movie=>setShow(movie));
            getMovieCast(id).then(movieCast=>setCast(movieCast?.cast));
            getSimilarMovies(id).then(movies=>setSimilar(movies?.results));
            getMovieReview(id).then(review=>{
                setReviews(review?.results)});
            getMovieWatchProvider(id).then(providers=>{
                setWatchProviders( prev=>(providers?.buy || providers?.rent || providers?.flatrate))});

        }
        else if(type=='tvseries'){
            getSeries(id).then(series=>setShow(series));
            getSeriesCast(id).then(seriesCast=>setCast(seriesCast?.cast));
            getSimilarTvSeries(id).then(shows=>setSimilar(shows?.results));
            getTvSeriesReview(id).then(review=>{
                setReviews(review?.results)});
            getTvSeriesWatchProvider(id).then(providers=>{
                setWatchProviders( providers?.buy || providers?.rent || providers?.flatrate)});
        }
    },[]);
    useEffect(()=>{
            if(type=='movie'){
                getMovieTrailer(id).then(url=>setTrailer(url?.results?.map(obj=>{return {name:obj.name, url:youtube + obj.key}})))
            }
            else if(type=='tvseries'){
                getTvSeriesTrailer(id).then(url=>setTrailer(url?.results?.map(obj=>{return {name:obj.name, url:youtube + obj.key}})))
        }
    },[show])
    return show && (<>
    <Navbar/>
    <div  style={{ overflow:"hidden"}}>
        <div className="show-banner" onMouseDown={(e)=>e.preventDefault()} >
            <Image src={backdropError?"/not-available.jpg":baseURL+original+show.backdrop_path} onError={()=>setBackdropError(true)} onLoad={handleLoading} layout="fill"  className="top-image" alt="..."/>
            {!loaded && (
                    <Skeleton
                        sx={{  backgroundColor:"rgba(255,255,255,0.3)" }}
                        variant="rectangular"
                        width="100%"
                        height="100%"
                    />
                )}
        </div>
        <div className="show-watch">
        <div className="poster" onMouseDown={(e)=>e.preventDefault()}  style={{border:"2px solid orange"}} >
            <Image className="image" onLoad={()=>setPosterLoaded(true)}
            onError={handlePosterError}
             src={posterError ? "/not-available.jpg" : baseURL+original+ show.poster_path} layout="fill" objectFit="cover" alt="..."/>
            {!posterLoaded && (
                    <Skeleton
                        sx={{  backgroundColor:"rgba(255,255,255,0.3)" }}
                        variant="rectangular"
                        width="100%"
                        height="100%"
                    />
                )}
        </div>
        
        <div className="provider-div">
        {watchProviders && watchProviders?.map((provider, i)=>(
            <div className="provider" key={i} >
                <Image  className="image" src={baseURL+original+ provider.logo_path} layout="fill" objectFit="cover" alt="..."/>
            </div>
        )
        )}
        </div>
        </div>
        
        <div  className="show-description">
            <h3 style={{marginBottom:"1rem"}}>{show.title || show.name || show.original_title}</h3>
            <h4 style={{marginBottom:"0.5rem"}}>{show?.genres?.map(x=>x.name).join(", ")}</h4>
            <p>{show.overview}</p>
            <div style={{display:"flex", gap:"6px", alignItems:"center"}}>
            <div  style={{display:"inline-block"}}>
            <Rating name="half-rating-read" className="rating" defaultValue={show.vote_average/2} precision={0.5} readOnly />
            </div>
            <Button variant="contained" onClick={handleOpen}>Reviews</Button>
            </div>
        </div>
    </div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-review"
        >    
    <div className="review-div" id="modal-modal-review">
    {reviews?.length >0 ? reviews.map((review,i)=> <Review key={i} {...review}/>) :
    <p>No reviews available</p>
    } 
    </div>
    </Modal>
    <div>
    <h2 style={{marginLeft:"2rem"}}>Cast</h2>
    <div className="show-slide">
    {cast && cast.map((cast,i)=><Cast key={i} {...cast}/>)}
    </div>
    </div>
    <div className="trailers">
        {trailer && trailer.map((video, i)=>(<div className="video" key={`trailer${i}`}>
        <iframe  src={video.url} title={video.title} allowFullScreen></iframe>
    </div>))}
    </div>
    <div>
    <h2 style={{marginLeft:"2rem"}}>You may also like</h2>
    <div className='show-slide'>
      {similar && similar.map((show,i)=><Show key={i} {...show}/>)}
    </div>
    </div>
    <Footer/>
    </>)
}