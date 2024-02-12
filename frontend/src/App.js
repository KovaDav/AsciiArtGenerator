import React, {useState} from 'react';
import './App.css'
import { Analytics } from '@vercel/analytics/react';

function App(){
	const [selectedFile, setSelectedFile] = useState();
	const [ascii , setAscii] = useState("")
	const [braille , setBraille] = useState("")
	const [width , setWidth] = useState(50)
	const [brightness, setBrightness] = useState(128)
	const [isBrailleSelected , setIsBrailleSelected] = useState(false)
	const [isAsciiSelected, setIsAsciiSelected] = useState(false)

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleSubmission = () => {

		if(isAsciiSelected === false && isBrailleSelected === false){
			setIsAsciiSelected(true);
		}

		const formData = new FormData();
		formData.append('File', selectedFile);
		fetch(
			//`http://localhost:5000/string?width=${width}&brightness=${brightness}`
			`https://KovaDav.eu.pythonanywhere.com/string?width=${width}`
			,
			{
				method: 'POST',
				body: formData,
			})
			.then((response) => response.json())
			.then((result) => {
				console.log(result)
				setBraille(result.braille)
				setAscii(result.ascii)
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	const lineBreaker = (string) => {
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
		   <button onClick={e => setIsBrailleSelected(prevState => !prevState)}>Braille</button>
		   <button onClick={e => setIsAsciiSelected(prevState => !prevState)}>Ascii</button>
		   </div>
		   <p>What do you want the width of the picture to be? (default 50)</p>
		   <input type={"number"} defaultValue={width} onChange={e => setWidth((e.target.value))}/>
		   <p>Image brightness for Braille</p>
		   <input type={"range"} min={"1"} max={"254"} defaultValue={brightness} id={"Slider"} onChange={e => setBrightness(e.target.value)} onMouseUp={handleSubmission}></input>
	   </div>
			<div>
				<button className={"SubmitButton"} onClick={handleSubmission}>Submit</button>
		</div>
		</div>
		   <div className={"StringContainer"}>
	   {isAsciiSelected &&<div className="AsciiString">
		   		{lineBreaker(ascii)}
	   		</div>}
	   {isBrailleSelected &&<div className={"BrailleString"}>
				{lineBreaker(braille)}
			</div>}
		</div>
			</div>
	   </div>
	   <Analytics />
   </div>

	)
}
export default App;