import { useEffect, useState } from "react";
import "./AsciiSettingsCharType.css"
import Paper from '@mui/material/Paper';
import Button from '@mui/material-next/Button';


const AsciiSettings = () => {

    

   

    return(
    <Paper className="SettingsPaper" elevation={6}>
        <section className="TitleWrap">
        <h2 className="NoMargin">Character Type</h2>
        </section>
        <div className="FlexColumnContainerCentered">
        <Button className="AsciiSettingsOptionalButton" size="large" variant="filled">Ascii</Button>
        <Button className="AsciiSettingsOptionalButton" size="large" variant="filled">Braille</Button>
        <Button className="AsciiSettingsOptionalButton" size="large" variant="filled">Braille-Atkinson</Button>
        </div>
    </Paper>
    );

}

export default AsciiSettings;