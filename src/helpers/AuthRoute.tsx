import React, { Children } from 'react'
// import { useSelector } from 'react-redux'
import { Route, Navigate, Routes } from 'react-router-dom';

import PropTypes from 'prop-types';
const AuthRoute = ({ children }:any) => {

  const loginSession = localStorage.getItem("token");
  let isPermission = loginSession ? true : false;


  if (isPermission) {
    return children
  } else {
    return <Navigate to="/login"></Navigate >
  }
}

AuthRoute.propTypes = {
  path: PropTypes.any,
  render: PropTypes.any,
  children: PropTypes.any,

};

export default AuthRoute
