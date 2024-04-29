import Paper from '@mui/material/Paper';
import Optional from "../AsciiSettingsOptional/AsciiSettingsOptional"
import Button from '@mui/material-next/Button';
import "./ArtInspector.css"
import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ArtInspector = ({colorInverted,string, setReplace, replace, type, setBrightness, brightness, setShowArt, showArt}) => {

    const spanCreator = (string) => {
		return string.split('').map(str => str === '\n'? <div className='break'></div>:<span className={"StringSpan"}>{str}</span>);
	}

    const copy = () =>{
        navigator.clipboard.writeText(string)
    }

    return(
        <div>
        <Paper id="ArtInspector">
            <div id='String' className={colorInverted ? 'stringWrapperInverted' : 'stringWrapper' } >
				{spanCreator(string)}
			</div>
            <div id="ArtInspectorButtonContainer">
            <IconButton onClick={() => copy()}><ContentCopyIcon /></IconButton>
            <Button id="ArtInspectorCancelButton" onClick={() => {setShowArt(!showArt)}}>Cancel</Button>
            </div>
        </Paper>
        </div>
    )
}

export default ArtInspector