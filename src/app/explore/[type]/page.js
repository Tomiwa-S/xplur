'use client'
import "./page.css";
import { redirect, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { explore } from "@/app/server/explore";
import { Button } from "@mui/material";
import Showlist from "@/app/components/show-list";
import RefreshIcon from '@mui/icons-material/Refresh';
import Navbar from "@/app/components/Navbar";
export default function Page(props){
    const [loaded, setLoaded] = useState(false)
    const [content, setContent] = useState(false);
    const [page, setPage] = useState(1);
    const type = props.params.type == "tv" ? "Series" : "Movies";
    useEffect(()=>{
        'use client'
        if(props.params.type!="movie" && props.params.type!="tv"){
        redirect("/");
        }
        explore(props.params.type, page).then(response=>setContent(response?.results));
        setLoaded(true)
    },[])
    const loadMore= ()=>{
        setPage((prev)=>prev+1);
        explore(props.params.type, page).then(response=>setContent((prev)=>{
            const result = response?.results;
            return [...prev, ...result]
        }))};
    return (<>
    <Navbar/>
    <h1 className="explore-heading">Explore your favourite {type}</h1>
    {loaded && content &&  content?.map((show, i)=>(
        <Showlist key={i} type={props.params.type} {...show}/>
    ))}
    <div style={{display:"flex"}}>
        <Button onClick={loadMore} endIcon={<RefreshIcon/>}
         sx={{ width:"30dvw", margin:"3rem auto"}} variant="contained">Load More</Button>
    </div>
    </>)
}