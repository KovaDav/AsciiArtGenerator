import React, {useState} from 'react';
import './App.css'

function App(){
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
	const [result , setResult] = useState("")
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('File', selectedFile);

		fetch(
			`http://localhost:5000/braille`,
			{
				method: 'POST',
				body: formData,
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
		let counter = 0
		return result.split('\n').map(str => <p>{str}</p>);
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
		   <input defaultValue={50}/>
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