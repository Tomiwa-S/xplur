'use client'
import './show.css'
import Image from 'next/image'
import Link from 'next/link';
import CircularProgressWithLabel from './mui-circular';
import { getMovieGenre, getSeriesGenre} from '../server/genre';
import { useState } from 'react';
import { Skeleton } from '@mui/material';

export default function Show(props){
    const baseURL ='https://image.tmdb.org/t/p/';
    const genre = props.original_title ? getMovieGenre(props.genre_ids) : getSeriesGenre(props.genre_ids)
    const size = 'w500';
    const original = 'original';
    const type = props.original_title ? "movie" : "tvseries";
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const handleError = ()=>setError((prev)=>true)
    
    return (<>
    <Link href={`/${type}/${props.id}`} className='movie-link' style={{marginBottom:"2rem"}}>
        <div className='show-item'>
            <div className='show-image'>
                <Image className='s-image' style={{borderRadius:"6px"}} onError={handleError} onLoad={()=>setLoaded(true)} fill={true} sizes='10rem'  src={error? "/not-available.jpg" :baseURL+original+props.poster_path} objectFit='cover'  alt='...'/>
                 {!loaded && (
                    <Skeleton
                        sx={{  backgroundColor:"rgba(255,255,255,0.3)" }}
                        variant="rectangular"
                        width="100%"
                        height="100%"
                    />
                )}
            </div>
            <div style={{position:"relative",marginTop:"-0.8rem"}}>
                <CircularProgressWithLabel value={props.vote_average*10}  />
            </div>
            <div className='description'>
                <p className='title'>{props.title ||props.original_title || props.name}</p>
            </div>
        </div>
    </Link>
    </>)
}

