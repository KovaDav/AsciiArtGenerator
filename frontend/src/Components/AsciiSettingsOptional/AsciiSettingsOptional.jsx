import { useEffect, useState } from "react";
import "./AsciiSettingsOptional.css"
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';

const AsciiSettings = () => {

    

   

    return(
    <Paper className="SettingsPaper" elevation={6}>
        <section className="TitleWrap">
        <h2 className="NoMargin">Optional</h2>
        </section>
        <div className="AsciiOptionalSettingsContainer">
        <p className="NoMargin BoldText">Color inverter</p>
        <Switch id='brailleInverter' />
        <p className="NoMargin BoldText">Chat-compatible version</p>
        <Switch id='brailleReplaceEmptyCharInverter'/>
        </div>
    </Paper>
    );

}

export default AsciiSettings;