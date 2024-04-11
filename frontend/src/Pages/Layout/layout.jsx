import { Outlet, Link } from "react-router-dom";
import "./layout.css"
import React, {useEffect, useState, useRef} from 'react';
import Button from '@mui/material-next/Button';
import {useKindeAuth} from "@kinde-oss/kinde-auth-react";
import Toolbar from "../../Components/Toolbar/Toolbar";

const Layout = () => {

  const { login, register, logout, isAuthenticated, isLoading, user } = useKindeAuth();

  useEffect(() => {
      if(isAuthenticated){
          fetch(
              `http://localhost:5000/register`
              //`https://KovaDav.eu.pythonanywhere.com/ascii?width=${width}&inverted=${asciiInverted}`
              ,
              {
                  method: 'POST',
                  headers: {
                      "UserID" :   user.id,
                      "UserName" : user.given_name
                  }
              })
              .then((response) => response.json()
              )
              .catch((error) => {
                  console.error('Error:', error);
              });
      }
  })
    
return(
    <div className="Background">
       <Toolbar></Toolbar> 
       <div id="HeaderAndLayoutPageButtonContainer" className="headerDisappear">
       <h1 className={"Header"}>ASCII ART GENERATOR</h1>
       </div>
       <Outlet />
    </div>
)
};
  
  export default Layout;