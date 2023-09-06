import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Login from '../Login/Login';

const Protected = ({isLoggedIn, children}) => {

    if (!isLoggedIn) {
        return <Login />
      }
      return children;
}

export default Protected