
import Paper from '@mui/material/Paper';
import Optional from "../AsciiSettingsOptional/AsciiSettingsOptional"
import Button from '@mui/material-next/Button';
import "./StringPaper.css"

const StringPaper = ({colorInverted,setColorInverted, string, setReplace, replace, type, setBrightness, brightness }) => {

    const spanCreator = (string) => {
		return string.split('').map(str => str === '\n'? <div className='break'></div>:<span className={"StringSpan"}>{str}</span>);
	}

    const copyToCLipboard = () =>{
        navigator.clipboard.writeText(string)
    }

    return(
        <Paper id="StringPaper">
        <Optional  setColorInverted={setColorInverted} colorInverted={colorInverted} setReplace={setReplace} replace={replace}
         type={type} setBrightness={setBrightness} brightness={brightness} copyToCLipboard={copyToCLipboard()}/>
            <div className={colorInverted ? 'stringWrapperInverted' : 'stringWrapper' } >
				{spanCreator(string)}
			</div>
            <Button id="StringSaveButton">Save</Button>
        </Paper>
    )
}

export default StringPaper