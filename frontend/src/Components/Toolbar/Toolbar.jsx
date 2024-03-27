import {useKindeAuth} from "@kinde-oss/kinde-auth-react";
import "./Toolbar.css"
import { Link } from "react-router-dom";


const Toolbar = () => {
    const { login, register, logout, isAuthenticated, isLoading, user } = useKindeAuth();


    return(
        <section id='Toolbar'>
            {!isAuthenticated &&<> 
            <button className='toolbarButton' onClick={login}>Login</button> 
            <button className='toolbarButton' onClick={register}>Register</button>
            </>}
                <Link to="/playaround">
                    <button className='toolbarButton'>Play around with Ascii Art</button>
                </Link>
                <Link to="/pdf">
                    <button className='toolbarButton'>Download Ascii Art as PDF</button>
                </Link>
            {isAuthenticated && 
            <button className='toolbarButton' onClick={logout}>Logout</button>}
        </section>
    )
}

export default Toolbar