
import "./AsciiSettingsCharType.css"
import Paper from '@mui/material/Paper';
import Button from '@mui/material-next/Button';


const AsciiSettings = ( {isAsciiSelected, setIsAsciiSelected, isBrailleSelected, setIsBrailleSelected, isAtkinsonSelected, setIsAtkinsonSelected}) => {


   

    return(
    <Paper className="SettingsPaper" elevation={6}>
        <section className="TitleWrap">
        <h2 className="NoMargin">Character Type</h2>
        </section>
        <div className="FlexColumnContainerCentered">
        <Button className={isAsciiSelected ? "AsciiSettingsOptionalButton ButtonActive" : "AsciiSettingsOptionalButton"} size="large" variant="filled" onClick={e => setIsAsciiSelected(!isAsciiSelected)}>Ascii</Button>
        <Button className={isBrailleSelected ? "AsciiSettingsOptionalButton ButtonActive" : "AsciiSettingsOptionalButton"} size="large" variant="filled" onClick={e => setIsBrailleSelected(!isBrailleSelected)}>Braille</Button>
        <Button className={isAtkinsonSelected ? "AsciiSettingsOptionalButton ButtonActive" : "AsciiSettingsOptionalButton"} size="large" variant="filled" onClick={e => setIsAtkinsonSelected(!isAtkinsonSelected)}>Braille-Atkinson</Button>
        </div>
    </Paper>
    );

}

export default AsciiSettings;