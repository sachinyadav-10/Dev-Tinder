import React from 'react';

const Card = ({ user }) => {
  const { firstName, lastName, about, photourl, gender, age } = user || {};

  return (
    <div className="card bg-neutral shadow-sm text-neutral-content w-64">
      <div className="card-body items-center text-center">
        <figure>
          <img src={photourl} alt="User" />
        </figure>
        <h2 className="card-title">{firstName + ' ' + lastName}</h2>
        <p>{age} {gender}</p>
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Interested</button>
          <button className="btn btn-ghost">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default Card;