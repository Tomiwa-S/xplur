import './show-list.css';
import { Skeleton } from '@mui/material';
import { Suspense } from 'react'; 
export default function ShowListSkeleton(){
    return (
        <div className='show-list-outter'>
        <div className='show-list-poster'>
            <Skeleton variant='rectangle' sx={{width:"100%", height:"100%", backgroundColor:"rgba(255,255,255,0.3)"}}/>
        </div>
        <div className='show-list-description'>
            <Skeleton variant='rectangle' animation="wave" sx={{width:"100%", height:"100%", backgroundColor:"rgba(255,255,255,0.1)"}}/>
        </div>
        </div>
    )
}