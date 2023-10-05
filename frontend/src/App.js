import React, {useState} from 'react';
import './App.css'

function App(){
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
	const [result , setResult] = useState("")
	const [width , setWidth] = useState(0)
	const [counter , setCounter] = useState(0)
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
			`http://localhost:5000/braille?width=${width}`,
			{
				method: 'POST',
				body: formData
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
				setResult(result.image)
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	const lineBreaker = () => {
		return result.split('\n').map(str => <p key={counter}>{str}</p>);
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
		   <button>Braille</button>
		   <button>Ascii</button>
		   <p>What do you want the width of the picture to be? (default 50)</p>
		   <input type={"number"} defaultValue={50} onChange={e => setWidth((e.target.value))}/>
	   </div>
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
	  		 <div className="AsciiString">
			{lineBreaker()}
	   </div>
   </div>

	)
}
export default App;