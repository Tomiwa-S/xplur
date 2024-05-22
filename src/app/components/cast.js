'use client';
import { useState } from 'react';
import './cast.css';
import Image from 'next/image';
import { Skeleton } from '@mui/material';

export default function Cast(props){
    const [error, setError] = useState(false);
    const handleError = ()=>setError((prev)=>true)
    const [loaded, setLoaded] = useState(false);
    const baseURL ='https://image.tmdb.org/t/p/';
    const original = 'original';
    return (<>
        <div className='cast-item'>
            <div className='cast-image'>
                <Image className='s-image' onError={handleError} onLoad={()=>setLoaded(true)} 
                style={{borderRadius:"6px"}} fill={true} sizes='10rem'  
                src={error?"/not-available.jpg":baseURL+original+props.profile_path} 
                objectFit='cover'  alt='...'/>

                {!loaded && (
                    <Skeleton
                        sx={{  backgroundColor:"rgba(255,255,255,0.3)" }}
                        variant="rectangular"
                        width="100%"
                        height="100%"
                    />
                )}
            </div>
            <div className='cast-text'>
                <code className=''>{props.character}</code>
                <p className=''>{props.original_name}</p>
            </div>
        </div>
    </>)
}