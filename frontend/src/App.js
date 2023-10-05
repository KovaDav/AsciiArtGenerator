import React, {useState} from 'react';
import './App.css'

function App(){
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
	const [ascii , setAscii] = useState("")
	const [braille , setBraille] = useState("")
	const [width , setWidth] = useState(50)
	const [isBrailleSelected , setIsBrailleSelected] = useState(false)
	const [isAsciiSelected, setIsAsciiSelected] = useState(false)
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();
		const data = new FormData()
		formData.append('File', selectedFile);
		data.append('Width', width)
		console.log(formData)
		fetch(
			`http://localhost:5000/string?width=${width}`,
			{
				method: 'POST',
				body: formData
			}
		)
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
		return string.split('\n').map(str => <p>{str}</p>);
	}


	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>

			) : (
				<p>Select a file to show details</p>
			)}
	   <div>
		   <p>Do you want to use Ascii characters or Braille characters?</p>
		   <button onClick={e => setIsBrailleSelected(prevState => !prevState)}>Braille</button>
		   <button onClick={e => setIsAsciiSelected(prevState => !prevState)}>Ascii</button>
		   <p>What do you want the width of the picture to be? (default 50)</p>
		   <input type={"number"} defaultValue={width} onChange={e => setWidth((e.target.value))}/>
	   </div>
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
	   {isAsciiSelected &&<div className="AsciiString">
		   {lineBreaker(ascii)}
	   		</div>}
	   {isBrailleSelected &&<div className={"BrailleString"}>
				{lineBreaker(braille)}
			</div>}
   </div>

	)
}
export default App;