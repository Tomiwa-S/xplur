'use client';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './welcome.css';
import { getWelcomeImage } from '../server/tmdb';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Skeleton } from '@mui/material';
export default function Welcome(props){
    const baseURL ='https://image.tmdb.org/t/p/original';
    const [imageUrl, setImageUrl] = useState(false);
    const [loaded, setLoaded] = useState(false)
    useEffect(()=>{
        getWelcomeImage(props).then((x)=>{
            setImageUrl(prev=>{
                return x[0]?.backdrops.slice(0,4)?.map(file=>file.file_path)
            })
        })        
    },[props])
    useEffect(()=>{
        new Swiper('.swiper', {
            modules: [Navigation, Pagination, Autoplay],
            loop:false,
            // autoplay:{
            //   delay:9000,
            //   pauseOnMouseEnter:false,
            // },
            pagination: {
              el: '.swiper-pagination',
              clickable:true,
            },
            scrollbar: {
              el: '.swiper-scrollbar',
            },
      }
      );
    },[])

 
    return (<>
    <div className='welcome'>
    <div className="swiper">
      <div className="swiper-wrapper">
          {imageUrl && imageUrl?.map((src, i)=>(
            <div className='swiper-slide' key={i}>
          <Image src={baseURL + src} fill="fit"
            quality={50}
           onLoad={()=>setLoaded(true)} objectFit='cover' priority alt='...'/>
             {!loaded && (
                  <Skeleton
                      sx={{  backgroundColor:"rgba(255,255,255,0.3)" }}
                      variant="rectangular"
                      width="100%"
                      height="100%"
                  />
              )}
            </div>))}
        </div>
        <div className="swiper-pagination"></div>
    </div>
    </div>
    </>)
}