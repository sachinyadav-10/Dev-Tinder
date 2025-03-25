import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import Card from './Card';

const EditProfile = ({ user }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    age: user?.age || '',
    about: user?.about || '',
    gender: user?.gender || '',
    photoUrl: user?.photoUrl || ''
  });

  // State for error and success
  const [err, setErr] = useState('');
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  // Update local state when the user prop changes
  useEffect(() => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      age: user?.age || '',
      about: user?.about || '',
      gender: user?.gender || '',
      photoUrl: user?.photoUrl || ''
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setErr(''); 
  
    if (!formData.firstName || !formData.lastName) {
      setErr('First Name and Last Name are required.');
      return;
    }

    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`, 
        formData,
        { withCredentials: true }
      );

      // Update Redux store with the new user data
      dispatch(addUser(res.data.data));
      
      // Show success toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      
    } catch (error) {
      setErr(error.response?.data?.message || error.message || 'An error occurred.');
    }
  };

  return (
    <div className='flex flex-col items-center'>
      {/* Toast Notification */}
      {showToast && (
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

            {err && <div className="text-red-500 mb-4">{err}</div>}

            {Object.entries(formData).map(([key, value]) => (
              <label key={key} className="floating-label mt-2">
                <span>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  className="input input-md w-full"
                  required={key === 'firstName' || key === 'lastName'}
                />
              </label>
            ))}

            <button
              className="btn btn-primary btn-block mt-6"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Live Preview Card */}
        <Card user={formData} />
      </div>
    </div>
  );
};

export default EditProfile;