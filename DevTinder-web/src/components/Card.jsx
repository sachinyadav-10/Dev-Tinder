import React from 'react';
import { removeFeed } from '../utils/feedslice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Card = ({ user }) => {
  const { firstName, lastName, about, photoUrl, gender, age, _id } = user || {};
  const dispatch = useDispatch();

  // Handle sending a connection request
  const handelSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {}, 
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
    } catch (error) {
      console.error('Error handling request:', error);
    }
  };

  return (
    <div className="card bg-neutral shadow-sm text-neutral-content w-64">
      <figure className='h-72 overflow-hidden bg-gray-300'>
        <img
          src={photoUrl || 'https://via.placeholder.com/150'}
          alt={firstName}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + ' ' + lastName}</h2>
        <p>{age} {gender}</p>
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => handelSendRequest("intrested", _id)}
          >
            Interested
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => handelSendRequest("ignore", _id)} 
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;