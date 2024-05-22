'use client'
import './show-list.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Skeleton } from '@mui/material';
import Rating from '@mui/material/Rating';



export default function Showlist(props){
    const [error, setError] = useState(false);
    const handleError = ()=>setError(true);
    const [loaded, setLoaded] = useState(false);
    const src ='https://image.tmdb.org/t/p/original'+props?.poster_path;
    return (<>
        <Link href={`/${props?.type}/${props?.id}`} className={`show-list-link`}>
        <div className='show-list-outter'>
        <div className='show-list-poster'>
            <Image src={error?"/not-available.jpg":src} onError={handleError} layout='fill' onLoad={()=>setLoaded(true)} objectFit='cover' alt='...'/>
            {!loaded && (
            <Skeleton
                sx={{  backgroundColor:"rgba(255,255,255,0.3)" }}
                variant="rectangular"
                width="100%"
                height="100%"
            />
        )}
        </div>
        
        <div className='show-list-description'>
        
        <div className='inner-description'>
        <p className='show-title'>{props?.title ||props?.name ||props?.original_title || props?.original_name}</p>
        <div className='show-rating'>
        <Rating name="half-rating-read" className="rating" defaultValue={props?.vote_average/2} precision={0.5} readOnly />
        </div>
            
     
        <p className='show-overview'>{props?.overview}</p>
        </div>
        </div>
        </div>
        </Link>
    </>)
}