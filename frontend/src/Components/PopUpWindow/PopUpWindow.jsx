import React, { useState, useEffect } from 'react';
import "./PopUpWindow.css"

function PopUpWindow({ text, handleOk, handleYes, handleNo }) {

    return (
        <div className='PopUp'>
            <div className='PopUpText'>
                <p>{text}</p>
            </div>
            <input></input>
            <div className='PopUpButton'>
                    <>
                        <button onClick={handleYes}>Ok</button>
                        <button onClick={handleNo}>Cancel</button>
                    </>
            </div>
        </div>
    )
}




export default PopUpWindow;