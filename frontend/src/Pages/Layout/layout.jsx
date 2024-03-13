import { Outlet, Link } from "react-router-dom";
import "./layout.css"
import React, {useEffect, useState} from 'react';
import Button from '@mui/material-next/Button';

const Layout = () => (

    <div className="Background">
       <div id="HeaderAndLayoutPageButtonContainer">
       <h1 className={"Header"}>ASCII ART GENERATOR</h1>
        <div id="LayoutPageButtonContainer">
            <Link to="playaround">
            <Button className="LayoutPageButton" size="large" variant="filledTonal">Play around with Ascii Art </Button>
            </Link>

            <Link to="/pdf">
            <Button className="LayoutPageButton" size="large" variant="filledTonal">Download Ascii Art as PDF</Button>
            </Link>
        </div>
       </div>
       <Outlet />
    </div>
    )

;
  
  export default Layout;