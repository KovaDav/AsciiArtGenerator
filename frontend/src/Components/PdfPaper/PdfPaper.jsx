
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Optional from "../AsciiSettingsOptional/AsciiSettingsOptional"
import { useEffect, useState } from "react";
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import "./PdfPaper.css"


const PdfPaper = ({colorInverted, setColorInverted, string, setReplace, replace, type, setBrightness, brightness, setWidth, setSelectedFile }) => {
    const [dropDownValue, setDropDownValue] = useState("")
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    return(
        <Paper  id="pdfDownloaderPaper">
        <div id="pdfDownloaderSettingsContainer" className='FlexColumnContainerCentered'>
        <p className='NoMargin BoldText'>Character type</p>
             <Select
                id="demo-simple-select"
                value={dropDownValue}
                label="Character Type"
                onChange={(e) => {setDropDownValue(e.target.value)}}>
                <MenuItem value={"Ascii"}>Ascii</MenuItem>
                <MenuItem value={"Braille"}>Braille</MenuItem>
                <MenuItem value={"Atkinson-Braille"}>Atkinson-Braille</MenuItem>
            </Select>
            <input className='description' type="file" name="file" onChange={changeHandler} />    
            <p className="BoldText">Width of string (in characters)</p>
            <TextField id="WidthField" type={"number"} defaultValue={50} onChange={e => setTimeout(()=>{setWidth((e.target.value))},1000)}/>  
            <p className="NoMargin BoldText">Color inverter</p>
            <Switch id='ColorInverter' onClick={e => setColorInverted(!colorInverted)}/>
            </div>    
        </Paper>
    )
}

export default PdfPaper