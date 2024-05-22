import { Skeleton } from "@mui/material";

export default function ShowSlideSkeleton(){
    const num = [1,2,3,4,5,6,7,8]
    return (<>
    <div style={{overflow:"hidden", display:"flex"}}>
    {num.map((_,i)=>(
        <div key={i} style={{minWidth:"10rem",aspectRatio:"27/40", display:"inline-block", 
        position:"relative", margin:"0 1rem"
        }}>
        <Skeleton
            animation="pulse"
            sx={{  backgroundColor:"rgba(255,255,255,0.3)" }}
            variant="rectangular"
            width="100%"
            height={"100%"}     
    />
    </div>
    ))}
    </div>
    </>)
}