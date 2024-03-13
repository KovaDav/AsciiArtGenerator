import { useEffect, useState } from "react";
import "./AsciiSettingsEssential.css"
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

const AsciiSettings = ({setSelectedFile, setWidth}) => {

    

    const changeHandler = (event) => {
          setSelectedFile(event.target.files[0]);
      };

    return(
    <Paper className="SettingsPaper" elevation={6}>
        <section className="TitleWrap">
        <h2 className="NoMargin">Essential options</h2>
        </section>
        <section className="FlexColumnContainerCentered">
            <input className='description' type="file" name="file" onChange={changeHandler} />    
            <p className="BoldText">Width of string (in characters)</p>
		    <TextField id="WidthField" type={"number"} defaultValue={50} onChange={e => setWidth((e.target.value))}/>  
        </section>
    </Paper>
    );

}

export default AsciiSettings;