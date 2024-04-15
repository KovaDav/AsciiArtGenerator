import {useKindeAuth} from "@kinde-oss/kinde-auth-react";
import Paper from '@mui/material/Paper';
import Optional from "../AsciiSettingsOptional/AsciiSettingsOptional"
import Button from '@mui/material-next/Button';
import "./StringPaper.css"
import PopUpWindow from "../PopUpWindow/PopUpWindow";
import React, { useState, useEffect } from 'react';

const StringPaper = ({colorInverted,setColorInverted, string, setReplace, replace, type, setBrightness, brightness }) => {
    const [popUp, setPopUp] = useState(false)
    const [name, setName] = useState("")
    const { login, register, logout, isAuthenticated, isLoading, user } = useKindeAuth();

    const spanCreator = (string) => {
		return string.split('').map(str => str === '\n'? <div className='break'></div>:<span className={"StringSpan"}>{str}</span>);
	}

    const copyToCLipboard = () =>{
        navigator.clipboard.writeText(string)
    }

    const saveString = () =>{
        fetch(
            `http://localhost:5000/save/string`
            //`https://KovaDav.eu.pythonanywhere.com/ascii?width=${width}&inverted=${asciiInverted}`
            ,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "UserId" :   user.id,
                    "ArtName" : name,
                    "StringType" : type,
                    "String" : [string],
                    "ColorInverted" : colorInverted
                })
            })
            .then((response) => response.json()
            )
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return(
        <Paper id="StringPaper">
        <Optional  setColorInverted={setColorInverted} colorInverted={colorInverted} setReplace={setReplace} replace={replace}
         type={type} setBrightness={setBrightness} brightness={brightness} copyToCLipboard={copyToCLipboard()}/>
            <div className={colorInverted ? 'stringWrapperInverted' : 'stringWrapper' } >
				{spanCreator(string)}
			</div>
            {popUp && <PopUpWindow text={("give name")} handleOk={() => {saveString(); setPopUp(!popUp)}} handleCancel={() => setPopUp(!popUp)} setName={setName}></PopUpWindow>}
            {isAuthenticated && <Button id="StringSaveButton" onClick={() => setPopUp(!popUp)}>Save</Button>}
        </Paper>
    )
}

export default StringPaper