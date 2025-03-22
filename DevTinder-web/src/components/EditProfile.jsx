import React, { useState } from 'react'
import Card from './Card';

const EditProfile = ({ user: { firstName: initialFirstName, lastName: initialLastName, age: initialAge, about: initialAbout, gender: initialGender, photoUrl: initialPhotoUrl } }) => {
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const [age, setAge] = useState(initialAge || "");
    const [about, setAbout] = useState(initialAbout || "");
    const [gender, setGender] = useState(initialGender || "");
    const [photourl, setPhotoUrl] = useState(initialPhotoUrl || "");
    const handleSave = async () => {
        console.log();
      };

  return (
    <div className='flex justify-center items-start gap-10 m-10'>
      {/* Edit Form */}
      <div className="card w-96 bg-base-300 shadow-sm">
        <div className="card-body">
          <h2 className="text-3xl font-bold mb-2">Edit Profile</h2>

          <label className="floating-label mt-2">
            <span>First Name</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="input input-md w-full"
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
              value={photourl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Photo Url"
              className="input input-md w-full"
            />
          </label>

          <button className="btn btn-primary btn-block mt-6" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      {/* Live Preview Card */}
      <Card user={{ firstName, lastName, about, gender, age, photourl }} />
    </div>
  );
};
  

export default EditProfile