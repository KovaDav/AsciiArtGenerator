import { Outlet, Link } from "react-router-dom";
import "./layout.css"
import Button from '@mui/material-next/Button';

const Layout = () => (
    <div className="Background">
        <h1 className={"Header"}>ASCII ART GENERATOR</h1>
        <div id="LandingPageButtonContainer">
            <Button
            className="LandingPageButton"
            size="large"
            variant="outlined">Download Ascii Art as PDF</Button>

            <Button
            className="LandingPageButton"
            size="large"
            variant="outlined">Just play around with Ascii Art</Button>
        </div>  

    </div>
  );
  
  export default Layout;