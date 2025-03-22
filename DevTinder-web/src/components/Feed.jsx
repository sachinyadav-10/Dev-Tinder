import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedslice'
import Card from './Card'

const Feed = () => {
  const dispatch= useDispatch();
  const feed= useSelector((store)=> store.feed);
  const getFeed = async () =>{
    try {
      if(feed && feed.length > 0)return;
      const res = await  axios.get(BASE_URL+"/feed",{withCredentials:true});
      dispatch(addFeed(res.data.data));  

    } catch (error) {
      console.log("feed error:"+error);
    }
  }
  useEffect(()=>{
    getFeed();
  }, [])
  console.log(feed);
  
  return (
    feed && (
      <div className='flex justify-center flex-wrap my-16 gap-4'>
        {feed.map((user, index) => (
          <Card key={index} user={user} />
        ))}
      </div>
  )
  );
};

export default Feed