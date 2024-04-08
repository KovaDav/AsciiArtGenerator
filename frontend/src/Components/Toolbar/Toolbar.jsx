import {useKindeAuth} from "@kinde-oss/kinde-auth-react";
import "./Toolbar.css"
import { Link } from "react-router-dom";
import React, {useEffect, useState, useRef} from 'react';

const Toolbar = () => {
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
    },[])


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