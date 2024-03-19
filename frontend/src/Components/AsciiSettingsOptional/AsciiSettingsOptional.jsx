
import "./AsciiSettingsOptional.css"
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const AsciiSettings = ({setColorInverted, colorInverted, setReplace, replace, type, setBrightness, brightness, copyToClipboard}) => {

    


    return(
    <Paper className="SettingsPaper" elevation={6}>
        <section className="TitleWrap">
        <h2 className="NoMargin">Optional</h2>
        </section>
        <div className="AsciiOptionalSettingsContainer">
        <p className="NoMargin BoldText">Color inverter</p>
        <Switch id='ColorInverter' onClick={e => setColorInverted(!colorInverted)}/>
        {type !== "ascii" &&<> <p className="NoMargin BoldText">Chat-compatible version</p>
        <Switch id='brailleReplaceEmptyCharInverter' onClick={e => setReplace(!replace)}/>
        <p className="NoMargin BoldText BrightnessLabel">Brightness</p>
        <input type={"range"} min={"1"} max={"254"} defaultValue={brightness} id={"Slider"} onChange={e => setBrightness(e.target.value)}></input>
        </>}
        <Tooltip title="Copy to Clipboard">
			<IconButton onClick={() => copyToClipboard}><ContentCopyIcon /></IconButton>
		</Tooltip>
		<Tooltip title="Download as PDF">
			<IconButton onClick={() => console.log("not yet implemented") }><PictureAsPdfIcon /></IconButton>
		</Tooltip>
        </div>
    </Paper>
    );

}

export default AsciiSettings;