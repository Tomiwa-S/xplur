import SearchListSkeleton from "@/app/components/search-list-suspense";
import dynamic from "next/dynamic";

const SearchResults = dynamic(()=>import ('./list'),{
    loading: ()=> <SearchListSkeleton/>,
    
})

export default SearchResults;