
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Optional from "../AsciiSettingsOptional/AsciiSettingsOptional"
import { useEffect, useState } from "react";
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import "./PdfPaper.css"
import Horizontal from '../../icons/horizontal.png';
import Vertical from '../../icons/vertical.png';

const PdfPaper = ({colorInverted, setColorInverted, string, setReplace, replace, type, setBrightness, brightness, setWidth, setSelectedFile }) => {
    const [dropDownValue, setDropDownValue] = useState("")
    const [paperOrientation, setPaperOrientation] = useState("p")
    const [paperSize, setPaperSize] = useState("a4")

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    return(
        <Paper  id="pdfDownloaderPaper">

            <div className='FlexColumnContainerCentered pdfDownloaderSettingsContainer'>
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
            </div>

            <div className='FlexColumnContainerCentered pdfDownloaderSettingsContainer'>
            <input className='description' type="file" name="file" onChange={changeHandler} />  
            <p className="BoldText">Width of string (in characters)</p>
            <TextField id="WidthField" type={"number"} defaultValue={50} onChange={e => setTimeout(()=>{setWidth((e.target.value))},1000)}/>  
            </div>

            <div className='FlexColumnContainerCentered pdfDownloaderSettingsContainer'>
            <p className="NoMargin BoldText BrightnessLabel">Brightness</p>
            <input type={"range"} min={"1"} max={"254"} defaultValue={brightness} id={"Slider"} onChange={e => setBrightness(e.target.value)}></input>
            <p className="NoMargin BoldText">Color inverter</p>
            <Switch id='ColorInverter' onClick={e => setColorInverted(!colorInverted)}/>
            </div>

            <div className='FlexColumnContainerCentered pdfDownloaderSettingsContainer'>
            <p className="NoMargin BoldText BrightnessLabel">Paper orientation</p>
                <section className='PdfCheckboxLabelContainer'>
                <img src={Vertical} alt="Vertical" className='PdfOrientationIcon'></img>
                <input className='PdfCheckbox' id='A3Checkbox' type='checkbox' checked={paperOrientation === "p" ? true : false} onChange={() => {setPaperOrientation("p")}}></input>
                </section>
                <section className='PdfCheckboxLabelContainer'>
                <img src={Horizontal} alt="Horizontal" className='PdfOrientationIcon'></img>
                <input className='PdfCheckbox' id='A2Checkbox' type='checkbox' checked={paperOrientation === "l" ? true : false} onChange={() => {setPaperOrientation("l")}}></input>
                </section>

            </div>

            <div id="pdfDownloaderSettingsPaperSizeContainer" className='pdfDownloaderSettingsContainer'>
            <p className="BoldText" id='PaperSizeHeader'>Paper size</p>
            <section className='PdfCheckboxLabelContainer'>
                <label className='PdfCheckboxLabel' for = 'A2Checkbox'>A2</label>
                <input className='PdfCheckbox' id='A2Checkbox' type='checkbox' checked={paperSize === "a2" ? true : false} onChange={() => {setPaperSize("a2")}}></input>
                </section>
                <section className='PdfCheckboxLabelContainer'>
                <label className='PdfCheckboxLabel' for = 'A3Checkbox'>A3</label>
                <input className='PdfCheckbox' id='A3Checkbox' type='checkbox' checked={paperSize === "a3" ? true : false} onChange={() => {setPaperSize("a3")}}></input>
                </section >
                <section className='PdfCheckboxLabelContainer'>
                <label className='PdfCheckboxLabel' for = 'A4Checkbox'>A4</label>
                <input className='PdfCheckbox' id='A4Checkbox' type='checkbox'  checked={paperSize === "a4" ? true : false} onChange={() => {setPaperSize("a4")}}></input>
                </section>
                <section className='PdfCheckboxLabelContainer'>
                <label className='PdfCheckboxLabel' for = 'A4Checkbox'>A5</label>
                <input className='PdfCheckbox' id='A5Checkbox' type='checkbox' checked={paperSize === "a5" ? true : false} onChange={() => {setPaperSize("a5")}}></input>
                </section>
                <section className='PdfCheckboxLabelContainer'>
                <label className='PdfCheckboxLabel' for = 'A6Checkbox'>A6</label>
                <input className='PdfCheckbox' id='A6Checkbox' type='checkbox' checked={paperSize === "a6" ? true : false} onChange={() => {setPaperSize("a6")}}></input>
                </section>
            </div>
            
        </Paper>
    )
}

export default PdfPaper