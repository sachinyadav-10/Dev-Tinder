import React, { useState } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from "../utils/constants"

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelSignUp = async () => {
    try {
      const response = await axios.post(BASE_URL+"/signup", {
        firstName,
        lastName,
        emailId,
        password,
      }, {withCredentials: true});
      dispatch(addUser(response.data.data));
      return navigate("/")
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(BASE_URL+"/login", {
        emailId,
        password
      }, {withCredentials: true});
      dispatch(addUser(response.data));
      return navigate("/")
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  return (
    <div className='relative h-screen bg-gradient-to-b from-black to-gray-600'>
      {/* Background image with overlay */}
      <div className='absolute inset-0 bg-[url(https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp)] bg-cover bg-center opacity-40'></div>

      {/* Login Card */}
      <div className='relative z-10 flex justify-center items-center min-h-[calc(100vh-200px)]'>
        <div className="w-full max-w-md px-10 py-8 mt-10">
          <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-center text-white mb-8">
                {isLogin ? "Login" : "Sign Up"}
              </h2>
              
              {!isLogin && (
                <>
                  <div className="mb-4">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setfirstName(e.target.value)}
                      placeholder="First Name"
                      className="w-full px-4 text-white py-3 border-b border-gray-400 focus:outline-none "
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setlastName(e.target.value)}
                      placeholder="Last Name"
                      className="w-full px-4 py-3 text-white border-b border-gray-400 focus:outline-none "
                      required
                    />
                  </div>
                </>
              )}

              <div className="mb-4">
                <input 
                  type="email" 
                  value={emailId} 
                  onChange={(e) => setEmailId(e.target.value)} 
                  placeholder="Email" 
                  className="w-full  px-4 py-3 text-white border-b border-gray-400 focus:outline-none "
                  required
                />
              </div>

              <div className="mb-6">
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Password" 
                  className="w-full px-4 py-3 text-white border-b border-gray-400 focus:outline-none "
                  required
                  minLength="8"
                />
              </div>

              <button 
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-full font-bold hover:opacity-90 transition-all duration-200 mb-4 active:scale-95 active:opacity-80"
                onClick={isLogin ? handleLogin : handelSignUp}
              >
                {isLogin ? "LOG IN" : "SIGN UP"}
              </button>

              <p className="text-center text-gray-600 text-sm">
                {isLogin ? (
                  <>
                    Don't have an account?{' '}
                    <span 
                      className="text-pink-500 font-semibold cursor-pointer"
                      onClick={() => setIsLogin(false)}
                    >
                      Sign up
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <span 
                      className="text-pink-500 font-semibold cursor-pointer"
                      onClick={() => setIsLogin(true)}
                    >
                      Log in
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login