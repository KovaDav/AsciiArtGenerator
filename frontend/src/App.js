import React, {useEffect, useState} from 'react';
import './App.css'
import Switch from '@mui/material/Switch';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { IconButton } from '@mui/material';
import { jsPDF } from 'jspdf';
import { font } from './BlistaBraille-normal';
import { font2 } from './MonospaceTypewriter-normal';
import { pdfForm} from './components/pdfForm'


function App(){
	const [selectedFile, setSelectedFile] = useState(false);
	const [ascii , setAscii] = useState("")
	const [braille , setBraille] = useState("")
	const [atkinson , setAtkinson] = useState("")
	const [width , setWidth] = useState(50)
	const [brailleBrightness, setBrailleBrightness] = useState(128)
	const [atkinsonBrightness, setAtkinsonBrightness] = useState(128)
	const [asciiInverted, setAsciiInverted] = useState(false)
	const [brailleInverted, setBrailleInverted] = useState(false)
	const [atkinsonInverted, setAtkinsonInverted] = useState(false)
	const [isBrailleSelected , setIsBrailleSelected] = useState(false)
	const [isAtkinsonSelected , setIsAtkinsonSelected] = useState(false)
	const [isAsciiSelected, setIsAsciiSelected] = useState(false)
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};
	
		
	const handleSubmissionAscii = () => {
		if(isAsciiSelected === true){

		const formData = new FormData();
		formData.append('File', selectedFile);
		fetch(
			//`http://localhost:5000/ascii?width=${width}&inverted=${inverted}`
			`https://KovaDav.eu.pythonanywhere.com/ascii?width=${width}&inverted=${asciiInverted}`
			,
			{
				method: 'POST',
				body: formData,
			})
			.then((response) => response.json()
			)
			.then((result) => {
				setAscii(result.ascii) 	
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		}
	};

	const handleSubmissionBraille = () => {
		if(isBrailleSelected === true){
			
		const formData = new FormData();
		formData.append('File', selectedFile);
		fetch(
			//`http://localhost:5000/braille?width=${width}&brightness=${brailleBrightness}&inverted=${inverted}`
			`https://KovaDav.eu.pythonanywhere.com/braille?width=${width}&brightness=${brailleBrightness}&inverted=${brailleInverted}`
			,
			{
				method: 'POST',
				body: formData,
			})
			.then((response) => response.json()
			)
			.then((result) => {	
				setBraille(result.braille)
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		}
	};

	const handleSubmissionAtkinson = () => {
		if(isAtkinsonSelected === true){
			
		const formData = new FormData();
		formData.append('File', selectedFile);
		fetch(
			//`http://localhost:5000/atkinson?width=${width}&brightness=${atkinsonBrightness}&inverted=${inverted}`
			`https://KovaDav.eu.pythonanywhere.com/atkinson?width=${width}&brightness=${atkinsonBrightness}&inverted=${atkinsonInverted}`
			,
			{
				method: 'POST',
				body: formData,
			})
			.then((response) => response.json()
			)
			.then((result) => {	
				setAtkinson(result.atkinson)
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		}
	};

const handlePDF = (type, text) =>{
	const doc = new jsPDF({
		orientation: "l",
		unit: "mm",
		format: "a4",
	  });

	  if(type === 'braille'){
	  doc.addFileToVFS("BlistaBraille.ttf", font)
	  doc.addFont("BlistaBraille-normal.ttf", "BlistaBraille", "normal")
	  doc.setFont('BlistaBraille')
	  }else{
	  doc.addFileToVFS("MonospaceTypewriter.ttf", font2)
	  doc.addFont("MonospaceTypewriter-normal.ttf", "MonospaceTypewriter", "normal")
	  doc.setFont('MonospaceTypewriter')
	  }

	  doc.setLineHeightFactor(1)
	  doc.setFontSize(10)
	  doc.text(text,1,1)
	  doc.save('ascii.pdf')
	}

  useEffect(() => {
    if(selectedFile === false){
		return
	}
      handleSubmissionAscii()
	  handleSubmissionBraille()
	  handleSubmissionAtkinson()
    
  }, [asciiInverted, brailleInverted, atkinsonInverted,isAsciiSelected, isBrailleSelected, isAtkinsonSelected]);

	const spanCreator = (string) => {
		return string.split('').map(str => str === '\n'? <div className='break'></div>:<span className={"StringSpan"}>{str}</span>);
	}

	return(
   <div className={"Background"}>
	   <div className={"Blur"}>
	   <h1 className={"Header"}>ASCII ART GENERATOR</h1>
	   <div className={"Filter"}>
		   <div className={"UploadToSubmit"}>
			<div className='OptionsDiv'>
			<input className='description' type="file" name="file" onChange={changeHandler} />
			<p className='description'>Invert image colors</p>
		   
		   </div>
	   <div className={"OptionsDiv"}>
		   <p className='description'>Do you want to use Ascii characters or Braille characters?</p>
		   <div className={"ButtonContainer"}>
		   <button onClick={() => setIsBrailleSelected(!isBrailleSelected)}>Braille</button>
		   <button onClick={() => setIsAtkinsonSelected(!isAtkinsonSelected)}>Atkinson-Braille</button>
		   <button onClick={() => setIsAsciiSelected(!isAsciiSelected)}>Ascii</button>
		   </div>
		   <p className='description'>What do you want the width of the picture to be? (default 50)</p>
		   <input type={"number"} defaultValue={width} onChange={e => setWidth((e.target.value))}/>
	   </div>
			<div>
				<button className={"SubmitButton"} onClick={() => {handleSubmissionAscii();handleSubmissionBraille();handleSubmissionAtkinson()}}>Submit</button>
		</div>
		</div>
		   <div className={"StringContainer"}>
	   	{isAsciiSelected &&<div className="AsciiString">
		   <div className='threeButtonsContainer'>
		   		<IconButton onClick={() => navigator.clipboard.writeText(ascii)}><ContentCopyIcon /></IconButton>
		   		<IconButton onClick={() => handlePDF('ascii',ascii)}><PictureAsPdfIcon /></IconButton>
		   <div className='inverterContainer'>
					<label for='asciiInverter'>Color inverter</label>
					<Switch id='asciiInverter' onClick={e => setAsciiInverted(!asciiInverted)}/>
				</div>
			</div>
		   <div className='break'/>
		   <div className={asciiInverted ? 'stringWrapperInverted' : 'stringWrapper'} >
		   		{spanCreator(ascii)}
			</div>
	   		</div>}
	   	{isBrailleSelected &&<div className={"BrailleString"}>
		   <p className='description'>Image brightness</p>
		   <div className='break'/>
		   <input type={"range"} min={"1"} max={"254"} defaultValue={brailleBrightness} id={"Slider"} onChange={e => setBrailleBrightness(e.target.value)}
		    onMouseUp={() => {handleSubmissionBraille()}}></input>
			<div className='threeButtonsContainer'>
					<IconButton onClick={() => navigator.clipboard.writeText(braille)}><ContentCopyIcon /></IconButton>
					<IconButton onClick={() => handlePDF('braille',braille)}><PictureAsPdfIcon /></IconButton>
				<div className='inverterContainer'>
					<label for='brailleInverter'>Color inverter</label>
					<Switch id='brailleInverter' onClick={e => setBrailleInverted(!brailleInverted)}/>
				</div>
			</div>
			<div className='break'/>
			<div className={brailleInverted ? 'stringWrapperInverted' : 'stringWrapper'} >
				{spanCreator(braille)}
			</div>
			</div>}
		{isAtkinsonSelected &&<div className={"BrailleString"}>
		<p className='description'>Image brightness</p>
		<div className='break'/>
			<input type={"range"} min={"1"} max={"254"} defaultValue={atkinsonBrightness} id={"Slider"} onChange={e => setAtkinsonBrightness(e.target.value)}
		    onMouseUp={() => {handleSubmissionAtkinson()}}></input>
			<div className='threeButtonsContainer'>
				<IconButton onClick={() => navigator.clipboard.writeText(atkinson)}><ContentCopyIcon /></IconButton>
				<IconButton onClick={() => handlePDF('braille',atkinson)}><PictureAsPdfIcon /></IconButton>
			<div className='inverterContainer'>
				<label for='atkinsonInverter'>Color inverter</label>
				<Switch id='atkinsonInverter' onClick={e => setAtkinsonInverted(!atkinsonInverted)}/>
			</div>
			</div>
			<div className='break'/>
				<div className={atkinsonInverted ? 'stringWrapperInverted' : 'stringWrapper'} >
				{spanCreator(atkinson)}
				</div>
			</div>}	
		</div>
			</div>
	   </div>
   </div>

	)
}
export default App;