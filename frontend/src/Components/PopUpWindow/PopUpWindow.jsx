import React, { useState, useEffect } from 'react';
import "./PopUpWindow.css"

function PopUpWindow({ text, handleOk, handleCancel, setName}) {

    return (
        <div className='PopUp'>
            <div className='PopUpText'>
                <p>{text}</p>
            </div>
            <input onChange={(e) => setName(e.target.value)}></input>
            <div className='PopUpButton'>
                    <>
                        <button onClick={() => handleOk()}>Ok</button>
                        <button onClick={() => handleCancel()}>Cancel</button>
                    </>
            </div>
        </div>
    )
}




export default PopUpWindow;