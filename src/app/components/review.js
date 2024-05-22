'use client';
import './review.css';
import Image from 'next/image';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';


export default function Review(props){
    const review = props;
    const baseURL ='https://image.tmdb.org/t/p/original';
    const [short, setShort] = useState(true);
    
    const backgrounds = ["red", "green", "grey", "brown","violet","indigo"];
    const randomIndex = Math.floor(Math.random()*backgrounds.length) % backgrounds.length;
    const markup = { __html: review.content };
    return (<>

    <div className='review-content'>
        <div style={{ display:"inline-block", position:"relative", margin:"auto"}}>
            <Avatar
            alt={review.author}
            src={baseURL+review.author_details.avatar_path}
            sx={{ width: 80, height: 80,
                background: backgrounds[randomIndex]
             }}
        >{review.author.split(' ')[0].slice(0, 2)}
        </Avatar>
        </div>
        <div className='author-name-dets' style={{display:"inline-block"}}>
            <h4>{review.author}</h4> 
            <p>{review.author_details.rating/2}/5</p>
        <div className='rating'>
            <Rating name="half-rating-read" defaultValue={review.author_details.rating/2} precision={0.5} readOnly />
        </div>
        </div>
        <p className={short && 'shorten'} onClick={()=>setShort(prev=>!prev)} dangerouslySetInnerHTML={markup}></p>
    </div>
    </>)
}