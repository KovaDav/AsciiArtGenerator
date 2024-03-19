
import Paper from '@mui/material/Paper';

import Optional from "../AsciiSettingsOptional/AsciiSettingsOptional"

const StringPaper = ({colorInverted,setColorInverted, string, setReplace, replace, type, setBrightness, brightness }) => {

    const spanCreator = (string) => {
		return string.split('').map(str => str === '\n'? <div className='break'></div>:<span className={"StringSpan"}>{str}</span>);
	}

    const copyToCLipboard = () =>{
        navigator.clipboard.writeText(string)
    }

    return(
        <Paper>
        <Optional  setColorInverted={setColorInverted} colorInverted={colorInverted} setReplace={setReplace} replace={replace}
         type={type} setBrightness={setBrightness} brightness={brightness} copyToCLipboard={copyToCLipboard()}/>
            <div className={colorInverted ? 'stringWrapperInverted' : 'stringWrapper' } >
				{spanCreator(string)}
			</div>
        </Paper>
    )
}

export default StringPaper