import { Button } from "@mui/material";
import "./explore.css";


export default function ExploreBtn(props){
    return (<>
    <div className="explore">
        <Button className="explore-btn" variant="text" href={`/${!!props.link && props.link}`}>Explore more...</Button>
    </div>
    </>)
}