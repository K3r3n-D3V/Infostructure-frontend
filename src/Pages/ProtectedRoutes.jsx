// import React from "react";
// import { Outlet, Navigate } from "react-router-dom"; // Make sure to import from 'react-router-dom'
// const ProtectedRoutes = ({ signedIn }) => {
//   const user = signedIn;
//   return user ? (
//     <Outlet />
//   ) : (
//     <Navigate to={user === false ? "/signup" : "/login"} />
//   );
// };
// export default ProtectedRoutes;


import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ signedIn }) => {
  return signedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
