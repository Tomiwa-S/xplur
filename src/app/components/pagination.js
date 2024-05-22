'use client'
import {  MemoryRouter, Route, Routes} from 'react-router-dom';
import Link from 'next/link';
import Pagination from '@mui/material/Pagination';
import { pagination } from '../server/search';
import PaginationItem from '@mui/material/PaginationItem';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';


function Content(props) {

  const searchParams = useSearchParams()
//   const page = searchParams.get('page')
  const query = props?.query
  const totalPage = props.totalPage || 1;
  const page = searchParams.get('page') > totalPage ? totalPage : searchParams.get('page') || 1;
  const router = useRouter();
  const data = {page:page, tab:props.tab, query:query}
  return (
    <Pagination
        onChange={(_, page)=>{ 
            // router.push(`/search/${query}?${page === 1 ? 'page=1' : `page=${page}`}&tab=${props.tab}`);
            router.push({
              pathname: `/search/${query}`,
              query: { page: page, 
                       tab:props.tab
              },
            })
        }}
      page={page}
      count={totalPage}
      sx={{
        backgroundColor:"rgba(255,255,255,0.4)",
        border:"2px solid white",
        display:"flex",
        justifyContent:"center",
        margin:"1rem 0",
        position:"relative",
        float:"left"
      }}
      renderItem={(item) => (
        <PaginationItem
          
          component={Link}
          href={`/search/${query}?${item.page === 1 ? 'page=1' : `page=${item.page}`}&tab=${props.tab}`}
          {...item}
          
          shallow={false}
        />
      )}
    />
  );
}
const pg ={
  border:"2px solid green"
}

export default function PaginationLink(props) {
  return (
    <div >
      <MemoryRouter initialIndex={0}>
        <Routes>
          <Route path="*" element={<Content {...props}/>} />
        </Routes>
      </MemoryRouter>
    </div>
  );
}
