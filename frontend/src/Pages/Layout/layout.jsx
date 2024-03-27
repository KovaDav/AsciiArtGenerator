import { Outlet, Link } from "react-router-dom";
import "./layout.css"
import React, {useEffect, useState, useRef} from 'react';
import Button from '@mui/material-next/Button';
import {useKindeAuth} from "@kinde-oss/kinde-auth-react";
import Toolbar from "../../Components/Toolbar/Toolbar";

const Layout = () => {
 


    
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