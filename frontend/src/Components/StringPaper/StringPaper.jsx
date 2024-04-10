import {useKindeAuth} from "@kinde-oss/kinde-auth-react";
import Paper from '@mui/material/Paper';
import Optional from "../AsciiSettingsOptional/AsciiSettingsOptional"
import Button from '@mui/material-next/Button';
import "./StringPaper.css"

const StringPaper = ({colorInverted,setColorInverted, string, setReplace, replace, type, setBrightness, brightness }) => {

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
            <Button id="StringSaveButton" onClick={() => saveString()}>Save</Button>
        </Paper>
    )
}

export default StringPaper