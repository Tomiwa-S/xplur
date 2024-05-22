import ShowListSkeleton from "./show-list-suspense";
export default function SearchListSkeleton(){
    const num = [1,2,3,4,5];
    return num.map((n,i)=><ShowListSkeleton key={i}/>)
}