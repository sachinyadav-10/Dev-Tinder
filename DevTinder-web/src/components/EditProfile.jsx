import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import Card from './Card';

const EditProfile = ({ user }) => {
  // State for form fields
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [age, setAge] = useState(user?.age || '');
  const [about, setAbout] = useState(user?.about || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [photoUrl, setphotoUrl] = useState(user?.photoUrl || '');
  const [showTost, setshowTost] = useState(false);

  // State for error and loading
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // Update local state when the `user` prop changes
  useEffect(() => {
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
    setAge(user?.age || '');
    setAbout(user?.about || '');
    setGender(user?.gender || '');
    setphotoUrl(user?.photoUrl || '');
  }, [user]);

  // Handle save button click
  const handleSave = async () => {
    setErr(''); // Clear previous errors

    // Validate required fields
    if (!firstName || !lastName) {
      setErr('First Name and Last Name are required.');
      return;
    }

    setIsLoading(true); // Show loading state

    try {
      // Prepare payload with valid values
      const payload = {
        firstName,
        lastName,
        age: age || null, // Use null if age is blank
        gender: gender || '', // Use empty string if gender is blank
        about: about || '', // Use empty string if about is blank
        photoUrl: photoUrl || '', // Use empty string if photoUrl is blank
      };


      const res = await axios.patch(`${BASE_URL}/profile/edit`, payload, {
        withCredentials: true,
      });


      // Update Redux store with new user data
      if (res.data && res.data.data) {
        dispatch(addUser(res.data.data)); // Update Redux store
        setshowTost(true); // Show toast notification
        setTimeout(() => {
          setshowTost(false); // Hide toast after 3 seconds
        }, 3000);
      } else {
        setErr('Invalid response from server.');
      }
    } catch (error) {
      setErr(error.response?.data?.message || error.message || 'An error occurred.');
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <div className='flex flex-col items-center'>
      {/* Toast Notification */}
      {showTost && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}

      <div className='flex justify-center items-start gap-10 m-10'>
        {/* Edit Form */}
        <div className="card w-96 bg-base-300 shadow-sm">
          <div className="card-body">
            <h2 className="text-3xl font-bold mb-2">Edit Profile</h2>

            {/* Display error message */}
            {err && <div className="text-red-500 mb-4">{err}</div>}

            <label className="floating-label mt-2">
              <span>First Name</span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="input input-md w-full"
                required
              />
            </label>

            <label className="floating-label mt-2">
              <span>Last Name</span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="input input-md w-full"
                required
              />
            </label>

            <label className="floating-label mt-2">
              <span>Age</span>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                className="input input-md w-full"
              />
            </label>

            <label className="floating-label mt-2">
              <span>About</span>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="About"
                className="input input-md w-full"
              />
            </label>

            <label className="floating-label mt-2">
              <span>Gender</span>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Gender"
                className="input input-md w-full"
              />
            </label>

            <label className="floating-label mt-2">
              <span>Photo Url</span>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setphotoUrl(e.target.value)}
                placeholder="Photo Url"
                className="input input-md w-full"
              />
            </label>

            <button
              className="btn btn-primary btn-block mt-6"
              onClick={handleSave}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Live Preview Card */}
        <Card user={{ firstName, lastName, about, gender, age, photoUrl }} />
      </div>
    </div>
  );
};

export default EditProfile;