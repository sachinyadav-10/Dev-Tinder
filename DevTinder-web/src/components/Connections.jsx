import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    // Fetch connections from the server
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnections(res.data.data)); // Update Redux store with connections
        } catch (error) {
            console.error('Error fetching connections:', error);
        }
    };

    // Fetch connections when the component mounts
    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) {
        return <h1 className='text-4xl font-bold text-center my-18'>Loading...</h1>;
    }

    if (connections.length === 0) {
        return <h1 className='text-4xl font-bold text-center my-18'>No connections found</h1>;
    }
    
    return (
        <div className='flex flex-col items-center my-18'>
            <h1 className='text-4xl font-bold mb-8'>Connections</h1>
            <div className='w-full max-w-2xl'>
                {connections.map((connection) => (
                    <div key={connection._id} className='flex items-center p-4 border-b border-gray-200'>
                        <img
                            src={connection.fromUserId.photoUrl || 'https://via.placeholder.com/150'}
                            alt={connection.fromUserId.firstName}
                            className='w-12 h-12 rounded-full mr-4'
                        />
                        <div>
                            <h2 className='text-xl font-semibold'>
                                {connection.fromUserId.firstName} {connection.fromUserId.lastName}
                            </h2>
                            <p className='text-gray-600'>{connection.fromUserId.age} {connection.fromUserId.gender}</p>
                            <p className='text-gray-600'>{connection.fromUserId?.about}</p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Connections;