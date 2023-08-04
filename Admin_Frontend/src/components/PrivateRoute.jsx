import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const location = useLocation();
  // console.log(location);
  const { auth } = useSelector((store) => store.authReducer);

  return auth ? children : <Navigate to={"/login"} state={location.pathname} replace />;
}

export default PrivateRoute;
