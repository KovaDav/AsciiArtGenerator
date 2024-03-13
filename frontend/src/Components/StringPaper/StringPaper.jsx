import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Optional from "../AsciiSettingsOptional/AsciiSettingsOptional"

const StringPaper = ({colorInverted,setColorInverted, string, setReplace, replace, type }) => {

    const spanCreator = (string) => {
		return string.split('').map(str => str === '\n'? <div className='break'></div>:<span className={"StringSpan"}>{str}</span>);
	}

    return(
        <Paper>
        <Optional  setColorInverted={setColorInverted} colorInverted={colorInverted} setReplace={setReplace} replace={replace} type={type}/>
            <div className={colorInverted ? 'stringWrapperInverted' : 'stringWrapper' } >
				{spanCreator(string)}
			</div>
        </Paper>
    )
}

export default StringPaper