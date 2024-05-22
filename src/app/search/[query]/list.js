
import Showlist from "@/app/components/show-list";

export default function List(props){
    return (
        <div>
        {props?.show?.map((result,i)=>(
          <Showlist key={i} {...result} type={props.type}/>
         ))}
        </div>
    )
}