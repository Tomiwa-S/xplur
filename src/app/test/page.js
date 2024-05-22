import { Skeleton } from "@mui/material";
import SearchListSkeleton from "../components/search-list-suspense";
import ShowSlideSkeleton from "../skeletons/show-slide-skeleton";
import Explore from "../components/explore";

export default function test(){
    return <>
    <Skeleton
            animation="wave"
            sx={{  backgroundColor:"rgba(255,255,255,0.3)" }}
            variant="rectangular"
            width="100dvw"
            height="8rem"
    />
    <Skeleton
            animation="pulse"
            sx={{  backgroundColor:"rgba(255,255,255,0.3)" }}
            variant="rectangular"
            width="100dvw"
            height="3rem"
    />
    <SearchListSkeleton/>
    Show Slide Skelly
    <ShowSlideSkeleton/>
    <Explore/>
    </>
}