import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from '../Register/Register';
import Login from '../Login/Login';
import Home from '../../pages/Home/Home';
import Protected from '../Protected/Protected';

const RouterList = () => {

    const [isLoggedIn, setisLoggedIn] = React.useState(true);

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Protected isLoggedIn={isLoggedIn}><Home /></Protected>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
  )
}

export default RouterList