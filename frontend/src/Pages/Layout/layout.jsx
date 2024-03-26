import { Outlet, Link } from "react-router-dom";
import "./layout.css"
import React, {useEffect, useState, useRef} from 'react';
import Button from '@mui/material-next/Button';
import {useKindeAuth} from "@kinde-oss/kinde-auth-react";


const Layout = () => {
    const { login, register } = useKindeAuth();
    const {user} = useKindeAuth();

    const sayhello = () =>{
        try{
            console.log(user.id)
        }catch(e){
            console.log(e)
        }
    }
    
        
        
    
return(
    <div className="Background">
       <div id="HeaderAndLayoutPageButtonContainer" className="headerDisappear">
       <h1 className={"Header"}>ASCII ART GENERATOR</h1>
        <div id="LayoutPageButtonContainer">
            <button onClick={e => sayhello()} ></button>
            <Link to="/playaround">
            <Button className="LayoutPageButton" size="large" variant="filledTonal">Play around with Ascii Art </Button>
            </Link>
            <Link to="/pdf">
            <Button className="LayoutPageButton" size="large" variant="filledTonal">Download Ascii Art as PDF</Button>
            </Link>
            <button onClick={register} type="button">Register</button>
            <button onClick={login} type="button">Log In</button>
        </div>
       </div>
       <Outlet />
    </div>
)
};
  
  export default Layout;