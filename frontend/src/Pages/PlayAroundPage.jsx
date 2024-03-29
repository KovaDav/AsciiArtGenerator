import { useEffect } from "react";
import { useState } from "react";
import "../index.css"
import  AsciiSettingsEssential  from "../Components/AsciiSettingsEssential/AsciiSettingsEssential"
import AsciiSettingsCharType from "../Components/AsciiSettingsCharType/AsciiSettingsCharType"
import StringPaper from "../Components/StringPaper/StringPaper"; 

const PlayAroundPage = () => {
  const [selectedFile, setSelectedFile] = useState(false)
  const [width , setWidth] = useState(50)
  const [ascii , setAscii] = useState("")
	const [braille , setBraille] = useState("")
	const [atkinson , setAtkinson] = useState("")
  const [isBrailleSelected , setIsBrailleSelected] = useState(false)
	const [isAtkinsonSelected , setIsAtkinsonSelected] = useState(false)
	const [isAsciiSelected, setIsAsciiSelected] = useState(false)
  const [brailleBrightness, setBrailleBrightness] = useState(128)
	const [atkinsonBrightness, setAtkinsonBrightness] = useState(128)
	const [asciiInverted, setAsciiInverted] = useState(false)
	const [brailleInverted, setBrailleInverted] = useState(false)
	const [atkinsonInverted, setAtkinsonInverted] = useState(false)
	const [brailleReplace, setBrailleReplace] = useState(false)
	const [atkinsonReplace, setAtkinsonReplace] = useState(false)


  const handleSubmissionAscii = () => {
		if(isAsciiSelected){    

		const formData = new FormData();
		formData.append('File', selectedFile);
		fetch(
			//`http://localhost:5000/ascii?width=${width}&inverted=${asciiInverted}`
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
			//`http://localhost:5000/braille?width=${width}&brightness=${brailleBrightness}&inverted=${brailleInverted}&replace=${brailleReplace}`
			`https://KovaDav.eu.pythonanywhere.com/braille?width=${width}&brightness=${brailleBrightness}&inverted=${brailleInverted}&replace=${brailleReplace}`
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
			//`http://localhost:5000/atkinson?width=${width}&brightness=${atkinsonBrightness}&inverted=${atkinsonInverted}&replace=${atkinsonReplace}`
			`https://KovaDav.eu.pythonanywhere.com/atkinson?width=${width}&brightness=${atkinsonBrightness}&inverted=${atkinsonInverted}&replace=${atkinsonReplace}`
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
    
  }, [selectedFile,brailleBrightness,atkinsonBrightness,width,brailleReplace, atkinsonReplace,asciiInverted, brailleInverted, atkinsonInverted,isAsciiSelected, isBrailleSelected, isAtkinsonSelected]);

  
    return(
      <div className="ElementBackground">
        <div className="FlexRowContainer">
          <AsciiSettingsEssential setSelectedFile={setSelectedFile} setWidth={setWidth} />
          <AsciiSettingsCharType isAsciiSelected={isAsciiSelected} setIsAsciiSelected={setIsAsciiSelected}
           isBrailleSelected={isBrailleSelected} setIsBrailleSelected={setIsBrailleSelected} 
           isAtkinsonSelected={isAtkinsonSelected} setIsAtkinsonSelected={setIsAtkinsonSelected}/>
        </div>
        <div className="FlexRowContainer">
          {isAsciiSelected && <StringPaper colorInverted={asciiInverted} string={ascii} setColorInverted={setAsciiInverted} type={"ascii"}/>}
          {isBrailleSelected && <StringPaper colorInverted={brailleInverted} string={braille}
           setColorInverted={setBrailleInverted} setReplace={setBrailleReplace} replace={brailleReplace}
            type={"braille"} brightness={brailleBrightness} setBrightness={setBrailleBrightness}/>}
          {isAtkinsonSelected && <StringPaper colorInverted={atkinsonInverted} string={atkinson}
           setColorInverted={setAtkinsonInverted} setReplace={setAtkinsonReplace} replace={atkinsonReplace}
            type={"atkinson"} brightness={atkinsonBrightness} setBrightness={setAtkinsonBrightness}/>}
        </div>
      </div>
    )
}

export default PlayAroundPage;