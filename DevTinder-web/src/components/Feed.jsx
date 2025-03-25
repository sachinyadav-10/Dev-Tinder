import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedslice';
import Card from './Card';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch feed from the server
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data.data)); // Update Redux store with feed
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching feed:', error); // Debugging: Log the error
      setError('Failed to fetch feed. Please try again.'); // Set error message
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  // Fetch feed when the component mounts
  useEffect(() => {
    getFeed();
  }, []);

  // Show a loading message while fetching data
  if (isLoading) {
    return <h1 className='text-4xl font-bold text-center my-16'>Loading...</h1>;
  }

  // Show an error message if the request fails
  if (error) {
    return <h1 className='text-4xl font-bold text-center my-16'>{error}</h1>;
  }

  // Show a message if there are no feeds
  if (!feed || feed.length === 0) {
    return <h1 className='text-4xl font-bold text-center my-16'>No feed available</h1>;
  }

  return (
    <div className='flex justify-center h-full flex-wrap my-16 gap-4'>
      
        <Card user={feed[0]} />
    </div>
  );
};
export default Feed;