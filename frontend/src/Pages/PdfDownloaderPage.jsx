import { useEffect } from "react";
import { useState } from "react";
import "../index.css"
import PdfPaper from "../Components/PdfPaper/PdfPaper"

const PdfDownloaderPage = () => {
 	const [selectedFile, setSelectedFile] = useState(false)
	const [width , setWidth] = useState(50)
	const [ascii , setAscii] = useState("")
	const [braille , setBraille] = useState("")
	const [atkinson , setAtkinson] = useState("")
  	const [brailleBrightness, setBrailleBrightness] = useState(128)
	const [atkinsonBrightness, setAtkinsonBrightness] = useState(128)
	const [asciiInverted, setAsciiInverted] = useState(false)
	const [brailleInverted, setBrailleInverted] = useState(false)
	const [atkinsonInverted, setAtkinsonInverted] = useState(false)
	const [pdfType, setPdfType] = useState("")

  const handleSubmissionAscii = () => {
		if(pdfType === 'ascii'){    

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
		if(pdfType === 'braille'){
			
		const formData = new FormData();
		formData.append('File', selectedFile);
		fetch(
			//`http://localhost:5000/braille?width=${width}&brightness=${brailleBrightness}&inverted=${brailleInverted}&replace=${brailleReplace}`
			`https://KovaDav.eu.pythonanywhere.com/braille?width=${width}&brightness=${brailleBrightness}&inverted=${brailleInverted}&replace=false`
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
		if(pdfType === 'atkinson'){
			
		const formData = new FormData();
		formData.append('File', selectedFile);
		fetch(
			//`http://localhost:5000/atkinson?width=${width}&brightness=${atkinsonBrightness}&inverted=${atkinsonInverted}&replace=${atkinsonReplace}`
			`https://KovaDav.eu.pythonanywhere.com/atkinson?width=${width}&brightness=${atkinsonBrightness}&inverted=${atkinsonInverted}&replace=false`
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

	const invertColorsPdfDownloader = (type) => {
		if(type === "ascii"){
			setAsciiInverted(!asciiInverted)
		}else if(type === "braille"){
			setBrailleInverted(!brailleInverted)
		}else if(type === "atkinson"){
			setAtkinsonInverted(!atkinsonInverted)
		}
	}	

  useEffect(() => {
    if(selectedFile === false){
		return
	}
    handleSubmissionAscii()
	handleSubmissionBraille()
	handleSubmissionAtkinson()
    
  }, [selectedFile,brailleBrightness,atkinsonBrightness,width,asciiInverted, brailleInverted, atkinsonInverted, pdfType]);
    return(
     
        <div id="pdfDownloaderPaperContainer" className="FlexColumnContainerCentered">
		<PdfPaper setSelectedFile={setSelectedFile} ascii={ascii} braille={braille} atkinson={atkinson}
		 setBrailleBrightness={setBrailleBrightness} setAtkinsonBrightness={setAtkinsonBrightness} invertColorsPdfDownloader={invertColorsPdfDownloader}
		 setWidth={setWidth} pdfType={pdfType} setPdfType={setPdfType}></PdfPaper>
        </div>
    )
}

export default PdfDownloaderPage;