import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../Models/interfaces";
import store from "../Store/store";


export  const AuthGuard: any = ({authenticationPath, outlet}: ProtectedRouteProps) =>  {
   const  isAuthenticated = store.getState().isLogged;
   
    if (isAuthenticated) {
      return outlet;
    } else {
      return <Navigate to={{ pathname: authenticationPath }} />;
    }
  }