
 import { redirect } from 'next/navigation';
 import { getFetch } from './tmdb';

async function search(data) {
  redirect(`/search/${data.get('query')}?page=1&tab=0`)
}

async function pagination(data){
  redirect(`/search/${data?.query}?page=${data?.page??1}&tab=${data.tab??1}`);
}

async function showSearch(name, type="movie", page=1){
  const url = `https://api.themoviedb.org/3/search/${type}?query=${name}&include_adult=true&language=en-US&page=${page}`;
  return await getFetch(url);
}

export {search, showSearch, pagination}