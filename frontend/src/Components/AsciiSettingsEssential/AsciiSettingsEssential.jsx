import { useEffect, useState } from "react";
import "./AsciiSettingsEssential.css"
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const AsciiSettings = ({setSelectedFile, setWidth, isPdf}) => {
    const [dropDownValue, setDropDownValue] = useState("")
    

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
		    <TextField id="WidthField" type={"number"} defaultValue={50} onChange={e => setTimeout(()=>{setWidth((e.target.value))},1000)}/>  
            
            {isPdf && 
            <>
            <InputLabel id="demo-simple-select-label">Character type</InputLabel>
             <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dropDownValue}
                label="Character Type"
                onChange={(e) => {setDropDownValue(e.target.value)}}>
                <MenuItem value={"Ascii"}>Ascii</MenuItem>
                <MenuItem value={"Braille"}>Braille</MenuItem>
                <MenuItem value={"Atkinson-Braille"}>Atkinson-Braille</MenuItem>
            </Select>
            </>}
        </section>

        
    </Paper>
    );

}

export default AsciiSettings;