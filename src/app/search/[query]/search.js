'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Navbar from '@/app/components/Navbar';
import { showSearch } from '@/app/server/search';
import './page.css';
import Loading from './loading';
import { Suspense } from 'react';
import PaginationLink from '@/app/components/pagination';
import { useSearchParams} from 'next/navigation';
import SearchResults from './searchlist';
// import Footer from '@/app/components/footer';
import Footer from '@/app/components/footer';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
        {children}
          {/* <Typography>{children}</Typography> */}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BasicTabs(props) {
  'use client'

  const searchParams = useSearchParams().get('tab');
  const [value, setValue] = useState(props.tab);
  const handleChange = (event, newValue) => {

    setValue(newValue);
  };
  const style={
    color:"white",
    width:"9rem"
  }
  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display:'flex', border:"1px solid white", alignContent:"center", 
      justifyContent:'center' }}>
        <Tabs sx={{color:"white"}} value={value} onChange={handleChange} aria-label="basic tabs example" className="tab-div">
          <Tab sx={style} className='search-tab' label="Movies" {...a11yProps(0)} data-total-results={props?.movies?.total_results} />
          <Tab sx={style} className='search-tab' label="Series" {...a11yProps(1)} data-total-results={props?.tvs?.total_results} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <SearchResults show={props?.movies?.results} type= "movie"/>
          <PaginationLink query={props?.query} totalPage={props.movies.total_pages} setPage={props.setPage} tab={0}/>
 
      </CustomTabPanel>
      <CustomTabPanel value={value}  index={1}>
        <SearchResults show={props?.tvs?.results} type= "tvseries"/>
          {/* <List show={props?.tvs?.results} type= "tvseries"/> */}
          {/* <div>
          {props?.tvs?.results?.map((result,i)=><Showlist key={i} {...result} type="tvseries"/>)}
          </div> */}
        <PaginationLink query={props?.query} totalPage={props.tvs.total_pages} setPage={props.setPage} tab={1}/>

      </CustomTabPanel>
    </Box>
  );
}
export default function Page(props){
    'use client'
    const query = props?.params?.query;
    const [movieResults, setMovieResults] = useState(false)
    const [tvResults, setTvResults] = useState(false);
    const [tab, setTab] = useState(false);
    const [tabLoad,setTabLoad] = useState(false);
    const searchParams = useSearchParams();
    const getPage = ()=> searchParams.get('page') || 1;
    const [page,setPage] = useState(getPage());
    useEffect(()=>{
        showSearch(query,'movie',page).then(response=>{
            setMovieResults(response)
        });
        showSearch(query,'tv',page).then(response=>{
            setTvResults(response);
        })
        const type = searchParams.get("tab");
        if(type==0){
          setTab(true);
        }
        setTabLoad(true)
    },[])
    

    return (<div style={{minHeight:"100dvh"}}>
    <Suspense fallback={<Loading/>}>
    {tabLoad && movieResults &&   <><Navbar/>
    <BasicTabs query={query} movies={movieResults} tvs ={tvResults} tab={tab?0:1} 
    /></>}
    </Suspense>
    <Footer/>
    </div>
    )
}