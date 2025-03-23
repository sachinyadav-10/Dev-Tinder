import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // Fetch connection requests from the server
    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests", { withCredentials: true });
            dispatch(addRequests(res.data.connectionRequest)); // Update Redux store with requests
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching requests:', error);
            setError('Failed to fetch requests. Please try again.'); // Set error message
        } finally {
            setIsLoading(false); // Hide loading state
        }
    };
    const handelRequest = async (status,_id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/"+status+"/"+_id,{},{ withCredentials: true });
            dispatch(removeRequest(_id));
        } catch (error) {
            console.log("error is there",error);
            
        }
    }
    // Fetch requests when the component mounts
    useEffect(() => {
        fetchRequests();
    }, []);

    // Show a loading message while fetching data
    if (isLoading) {
        return <h1 className='text-4xl font-bold text-center my-18'>Loading...</h1>;
    }

    // Show an error message if the request fails
    if (error) {
        return <h1 className='text-4xl font-bold text-center my-18'>{error}</h1>;
    }

    // Show a message if there are no requests
    if (!requests || requests.length === 0) {
        return <h1 className='text-4xl font-bold text-center my-18'>No requests found</h1>;
    }

    return (
        <div className='flex flex-col items-center my-18'>
            <h1 className='text-4xl font-bold mb-8'>Connection Requests</h1>
            <div className='w-full max-w-2xl'>
                {requests.map((request) => (
                    <div key={request._id} className='flex items-center p-4 border-b border-gray-200 '>
                        <img
                            src={request.fromUserId.photoUrl || 'https://via.placeholder.com/150'} // Fallback image if photoUrl is missing
                            alt={request.fromUserId.firstName}
                            className='w-12 h-12 rounded-full mr-4'
                        />
                        <div className='w-xs'>
                            <h2 className='text-xl font-semibold'>
                                {request.fromUserId.firstName} {request.fromUserId.lastName}
                            </h2>
                            <p className='text-gray-600'>{request.fromUserId.age} {request.fromUserId.gender}</p>
                            <p className='text-gray-600'>{request.fromUserId?.about}</p>
                        </div>
                        <div className='mx-12 flex'>
                            <button className="btn mx-4 bg-blue-600 btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-md" onClick={()=>handelRequest("accept",request._id)}>Accept</button>
                            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-md"onClick={()=>handelRequest("reject",request._id)}>Reject</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Requests;