import { Children } from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({children}) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));


  if (!user ||  user.role !== "admin") {
    // alert('u cant go to admin page u are user ')
   return  <Navigate to="/" replace />//if the user is not loged and role is not admin navigate to root url
  }
  return children
}

export default AdminRoute;
