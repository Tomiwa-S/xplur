
import './Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import {search}from "@/app/server/search"
import { Skeleton } from '@mui/material';
import Link from 'next/link';

export default function Navbar(){
    return (<>
    <div className='nav-div'>
    <nav>
    
        <Link href={"/"} style={{all:"unset"}}><div className='brand'>
        XpluR
        </div></Link>
   
    
    <form className="searchInputWrapper" action={search}>
    <input className="searchInput" name='query' type="search" placeholder='search for your favourite show'/>
    <button id='search-submit' type='submit'><SearchIcon className='searchInputIcon'/></button>
    </form>
    </nav>
    </div>
    <Skeleton
    sx={{
        width:"100dvw",
        height:"3px",
        background:"white"
    }}
    animation='wave'
    />
    </>)
}