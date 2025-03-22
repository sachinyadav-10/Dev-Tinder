import React from 'react';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector(store => store.user);

  if (!user || !user.user) {
    return <div>Loading...</div>; // or some other fallback UI
  }

  return (
    <div>
      <EditProfile user={user.user} />
    </div>
  );
};

export default Profile;