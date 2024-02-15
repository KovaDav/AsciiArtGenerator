import React, {useEffect, useState} from 'react';
import './App.css'
import Switch from '@mui/material/Switch';

function App(){
	const [selectedFile, setSelectedFile] = useState(false);
	const [ascii , setAscii] = useState("")
	const [braille , setBraille] = useState("")
	const [width , setWidth] = useState(50)
	const [brightness, setBrightness] = useState(128)
	const [inverted, setInverted] = useState(false)
	const [isBrailleSelected , setIsBrailleSelected] = useState(false)
	const [isAsciiSelected, setIsAsciiSelected] = useState(false)
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};
	
		
	const handleSubmissionAscii = () => {
		if(isAsciiSelected === true){

		const formData = new FormData();
		formData.append('File', selectedFile);
		fetch(
			`http://localhost:5000/ascii?width=${width}&inverted=${inverted}`
			//`https://KovaDav.eu.pythonanywhere.com/ascii?width=${width}&inverted=${inverted}`
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
			`http://localhost:5000/braille?width=${width}&brightness=${brightness}&inverted=${inverted}`
			//`https://KovaDav.eu.pythonanywhere.com/braille?width=${width}&brightness=${brightness}&inverted=${inverted}`
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


  useEffect(() => {
    if(selectedFile === false){
		return
	}
      handleSubmissionAscii()
	  handleSubmissionBraille()
    
  }, [inverted, isAsciiSelected, isBrailleSelected]);

	const spanCreator = (string) => {
		return string.split('').map(str => str === '\n'? <div className='break'></div>:<span className={"StringParagraph"}>{str}</span>);
	}

	return(
   <div className={"Background"}>
	   <div className={"Blur"}>
	   <h1 className={"Header"}>ASCII ART GENERATOR</h1>
	   <div className={"Filter"}>
		   <div className={"UploadToSubmit"}>
			<input type="file" name="file" onChange={changeHandler} />
	   <div className={"OptionsDiv"}>
		   <p>Do you want to use Ascii characters or Braille characters?</p>
		   <div className={"ButtonContainer"}>
		   <button onClick={() => setIsBrailleSelected(!isBrailleSelected)}>Braille</button>
		   <button onClick={() => setIsAsciiSelected(!isAsciiSelected)}>Ascii</button>
		   </div>
		   <p>What do you want the width of the picture to be? (default 50)</p>
		   <input type={"number"} defaultValue={width} onChange={e => setWidth((e.target.value))}/>
		   <p>Image brightness for Braille</p>
		   <input type={"range"} min={"1"} max={"254"} defaultValue={brightness} id={"Slider"} onChange={e => setBrightness(e.target.value)}
		    onMouseUp={() => {handleSubmissionAscii();handleSubmissionBraille()}}></input>
		   <p>Invert image colors</p>
		   <Switch onClick={e => setInverted(!inverted)}/>

	   </div>
			<div>
				<button className={"SubmitButton"} onClick={() => {handleSubmissionAscii();handleSubmissionBraille()}}>Submit</button>
		</div>
		</div>
		   <div className={"StringContainer"}>
	   {isAsciiSelected &&<div className="AsciiString">
		   		{spanCreator(ascii)}
	   		</div>}
	   {isBrailleSelected &&<div className={"BrailleString"}>
				{spanCreator(braille)}
			</div>}
		</div>
			</div>
	   </div>
   </div>

	)
}
export default App;