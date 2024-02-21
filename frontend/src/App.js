import React, {useEffect, useState} from 'react';
import './App.css'
import Switch from '@mui/material/Switch';

function App(){
	const [selectedFile, setSelectedFile] = useState(false);
	const [ascii , setAscii] = useState("")
	const [braille , setBraille] = useState("")
	const [atkinson , setAtkinson] = useState("")
	const [width , setWidth] = useState(50)
	const [brailleBrightness, setBrailleBrightness] = useState(128)
	const [atkinsonBrightness, setAtkinsonBrightness] = useState(128)
	const [inverted, setInverted] = useState(false)
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
			`https://KovaDav.eu.pythonanywhere.com/ascii?width=${width}&inverted=${inverted}`
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
			`https://KovaDav.eu.pythonanywhere.com/braille?width=${width}&brightness=${brailleBrightness}&inverted=${inverted}`
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
			`https://KovaDav.eu.pythonanywhere.com/atkinson?width=${width}&brightness=${atkinsonBrightness}&inverted=${inverted}`
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


  useEffect(() => {
    if(selectedFile === false){
		return
	}
      handleSubmissionAscii()
	  handleSubmissionBraille()
	  handleSubmissionAtkinson()
    
  }, [inverted, isAsciiSelected, isBrailleSelected, isAtkinsonSelected]);

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
			<input type="file" name="file" onChange={changeHandler} />
			<p className='description'>Invert image colors</p>
		   <Switch onClick={e => setInverted(!inverted)}/>
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
		   		{spanCreator(ascii)}
	   		</div>}
	   	{isBrailleSelected &&<div className={"BrailleString"}>
		   <p className='description'>Image brightness for Braille</p>
		   <div className='break'/>
		   <input type={"range"} min={"1"} max={"254"} defaultValue={brailleBrightness} id={"Slider"} onChange={e => setBrailleBrightness(e.target.value)}
		    onMouseUp={() => {handleSubmissionBraille()}}></input>
			<div className='break'/>
				{spanCreator(braille)}
			</div>}
		{isAtkinsonSelected &&<div className={"BrailleString"}>
		<p className='description'>Image brightness for Atkinson-Braille</p>
		<div className='break'/>
			<input type={"range"} min={"1"} max={"254"} defaultValue={atkinsonBrightness} id={"Slider"} onChange={e => setAtkinsonBrightness(e.target.value)}
		    onMouseUp={() => {handleSubmissionAtkinson()}}></input>
			<div className='break'/>
				{spanCreator(atkinson)}
			</div>}	
		</div>
			</div>
	   </div>
   </div>

	)
}
export default App;