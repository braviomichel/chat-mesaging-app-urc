import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';
import {Login} from "../user/Login";
import SignUpForm from '../user/SignUpForm';
import HomeChat from '../chat/HomeChat';
import Chats from '../chat/Chats';
import SaloonChats from '../chat/SaloonChats';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../app/store";
import {useEffect} from "react";
import { setLogout, setToken, setUserInfos } from '../features/loginSlice';

const AppRouter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = sessionStorage.getItem('token');
  const tokenID = sessionStorage.getItem('id');
  const tokenUsernanme = sessionStorage.getItem('username');

  useEffect(() => {
    if (token && tokenID && tokenUsernanme &&token!=='') {
      dispatch(setToken(token)); 
      dispatch(setUserInfos({userId:Number(tokenID), username:tokenUsernanme}));
      console.log("token : " + tokenID);
    } else {
      // L'utilisateur n'a pas de token, considérez-le comme non authentifié
      dispatch(setLogout());
     // navigate("/");

    }
  }, [token, dispatch]);


  return (
    <Router>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpForm/>} />
        <Route path="/home" element={<HomeChat/>} />
        <Route path="/home/user/:receiverName/:receiverId" element={<Chats />} />
        <Route path="/home/saloon/:saloonName/:saloonID" element={<SaloonChats />} />


        <Route path="*" element={<NotFound />} />


      </Routes>

    </Router>

  );


};

export default AppRouter;
