import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate, useLocation } from 'react-router'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userData = useSelector((store) => store.user);
  
  const fetchUser = async() => {
    if(userData){
      return;
    }
    try { 
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });   
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  // Don't show footer on login/signup pages
  const showFooter = !['/login', '/signup'].includes(location.pathname);

  return (
    <>
      <NavBar/>
      <Outlet/>
      {showFooter && <Footer/>}
    </>
  )
}

export default Body