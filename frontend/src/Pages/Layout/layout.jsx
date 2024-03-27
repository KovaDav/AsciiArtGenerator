import { Outlet, Link } from "react-router-dom";
import "./layout.css"
import React, {useEffect, useState, useRef} from 'react';
import Button from '@mui/material-next/Button';
import {useKindeAuth} from "@kinde-oss/kinde-auth-react";
import Toolbar from "../../Components/Toolbar/Toolbar";

const Layout = () => {
    const { login, register, isAuthenticated, isLoading, getToken } = useKindeAuth();
    const {user} = useKindeAuth();

    const fetchData = async () => {
        try {
            const accessToken = await getToken();
            const res = await fetch(`http://localhost:5000/userdata`, {
                method: 'POST',
                headers: {
                    UserId: `${user.id}`
                }
            });
            const {data} = await res.json();
            console.log({data});
        } catch (err) {
            console.log(err);
        }
    };
    
        
        
    
return(
    <div className="Background">
       <Toolbar isAuthenticated={isAuthenticated}></Toolbar> 
       <div id="HeaderAndLayoutPageButtonContainer" className="headerDisappear">
       <h1 className={"Header"}>ASCII ART GENERATOR</h1>
        <div id="LayoutPageButtonContainer">
            <button onClick={e => fetchData()} ></button>
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