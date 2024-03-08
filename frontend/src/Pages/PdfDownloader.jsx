import React, { useState, useEffect } from 'react';
import Horizontal from '../icons/horizontal.png';
import Vertical from '../icons/vertical.png';
import { jsPDF } from 'jspdf';
import { font } from '../BlistaBraille-normal';
import { font2 } from '../MonospaceTypewriter-normal';


function PdfForm({pdfString, setPdfString, pdfType, ascii, braille, atkinson, pdfClicked, setPdfClicked, width, setWidth, setBrailleBrightness, setAtkinsonBrightness}) {

    const [paperSize, setPaperSize] = useState("a4")
    const [paperOrientation, setPaperOrientation] = useState("p")
    const [paperCoordinateX, setPaperCoordinateX] = useState(1)
    const [paperCoordinateY, setPaperCoordinateY] = useState(1)

useEffect(() => {
    handlePdf(false)
},[ascii,braille,atkinson,paperSize,paperOrientation,paperCoordinateX,paperCoordinateY])

const handlePdf = (save) => {
    const doc = new jsPDF({
        orientation: paperOrientation,
        unit: "mm",
        format: paperSize,
      });
      if(pdfType === 'braille'){
        doc.addFileToVFS("BlistaBraille.ttf", font)
        doc.addFont("BlistaBraille-normal.ttf", "BlistaBraille", "normal")
        doc.setFont('BlistaBraille')
        doc.setLineHeightFactor(1)
        doc.setFontSize(10)
        doc.text(braille,paperCoordinateX,paperCoordinateY)
      }else if(pdfType === "atkinson"){
        doc.addFileToVFS("BlistaBraille.ttf", font)
        doc.addFont("BlistaBraille-normal.ttf", "BlistaBraille", "normal")
        doc.setFont('BlistaBraille')
        doc.setLineHeightFactor(1)
        doc.setFontSize(10)
        doc.text(atkinson,paperCoordinateX,paperCoordinateY)
      }else{
        doc.addFileToVFS("MonospaceTypewriter.ttf", font2)
        doc.addFont("MonospaceTypewriter-normal.ttf", "MonospaceTypewriter", "normal")
        doc.setFont('MonospaceTypewriter')
        doc.setLineHeightFactor(1)
        doc.setFontSize(10)
        doc.text(ascii,paperCoordinateX,paperCoordinateY)
      }

      
      setPdfString(doc.output('datauristring'))
      if(save){
          doc.save("ascii.pdf")
      }
}

const handleBrightnessChange = (brightness) => {
    if(pdfType === 'braille'){
        setBrailleBrightness(brightness)
    }else if(pdfType === "atkinson"){
        setAtkinsonBrightness(brightness)
    }
}

    return(
        <div className='PdfForm'>
            <h2>PDF downloader</h2>
            <div id= 'paperSizeImageWidthContainer'>
            <h4>Image width</h4>
            <input className="pdfWidthInput" type={"number"} defaultValue={width} onChange={e => setWidth((e.target.value))}/>
            <div id='paperSizeContainer'>
            <h4>Paper size</h4>
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
            </div>
            <div id="paperOrientationBrightnessContainer">
            {pdfType !== "ascii" && <div id="pdfImageBrightnessContainer">
            <h4>Image brightness</h4>
            <input type={"range"} min={"1"} max={"254"} defaultValue={128} id={"Slider"} onChange={e => handleBrightnessChange(e.target.value)}></input>
            </div>}
            <div id='paperOrientationContainer'>
            <h4>Paper orientation</h4>
                <section className='PdfCheckboxLabelContainer'>
                <img src={Vertical} alt="Vertical" className='PdfOrientationIcon'></img>
                <input className='PdfCheckbox' id='A3Checkbox' type='checkbox' checked={paperOrientation === "p" ? true : false} onChange={() => {setPaperOrientation("p")}}></input>
                </section>
                <section className='PdfCheckboxLabelContainer'>
                <img src={Horizontal} alt="Horizontal" className='PdfOrientationIcon'></img>
                <input className='PdfCheckbox' id='A2Checkbox' type='checkbox' checked={paperOrientation === "l" ? true : false} onChange={() => {setPaperOrientation("l")}}></input>
                </section>
            </div>
            </div>
            <h4>PDF preview</h4>
            <div id='pdfCoordinateContainer'>
                <input type={"range"} min={"1"} max={ paperSize === "a2" ? "448" : paperSize === "a3" ? "316" : paperSize === "a4" ? "224" : paperSize === "a5" ? "158" : "112" } id={"PdfHorizontalSlider"} className={"PdfSlider"} defaultValue={'1'} onChange={e => setPaperCoordinateX(e.target.value)}></input>
                <section id='pdfPreviewContainer'>
                    <input type={"range"} min={"1"} max={"350"} id={"PdfVerticalSlider"} className={"PdfSlider"} onChange={e => setPaperCoordinateY(e.target.value)}></input>
                    <iframe id='PdfPreview' title='pdf' src={pdfString} allow='fullscreen'/>
                </section>
            </div> 
            <div id='pdfButtonContainer'>
                <button className='BackgroundGreen' onClick={() => {setPdfClicked(!pdfClicked); handlePdf(true)}}>Save</button>  
                <button className='BackgroundRed' onClick={() => setPdfClicked(!pdfClicked)}>Cancel</button>
            </div>
        </div>
    )
}

export default PdfForm;