

import { Skeleton } from "@mui/material";

export default function loading(){
    return (<>
  
        <Skeleton
            animation="wave"
            sx={{  backgroundColor:"rgba(255,255,255,0.3)" }}
            variant="rectangular"
            width="100dvw"
            height="8rem"
        />
        <Skeleton
            animation="wave"
            sx={{  backgroundColor:"rgba(255,255,255,0.3)" }}
            variant="rectangular"
            width="100dvw"
            height="100dvh"
        />

    </>)
}