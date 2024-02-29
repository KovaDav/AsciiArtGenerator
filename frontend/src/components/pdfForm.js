import React, { useState, useEffect } from 'react';
import Horizontal from '../icons/horizontal.png';
import Vertical from '../icons/vertical.png';
import { jsPDF } from 'jspdf';
import { font } from '../BlistaBraille-normal';
import { font2 } from '../MonospaceTypewriter-normal';


function PdfForm({pdfString, setPdfString, pdfType, ascii, braille, atkinson}) {

useEffect(() => {
    const doc = new jsPDF({
        orientation: "l",
        unit: "mm",
        format: "a4",
      });
      console.log(pdfType)
      if(pdfType === 'braille'){
        doc.addFileToVFS("BlistaBraille.ttf", font)
        doc.addFont("BlistaBraille-normal.ttf", "BlistaBraille", "normal")
        doc.setFont('BlistaBraille')
        doc.setLineHeightFactor(1)
        doc.setFontSize(10)
        doc.text(braille,1,1)
      }else if(pdfType === "atkinson"){
        doc.addFileToVFS("BlistaBraille.ttf", font)
        doc.addFont("BlistaBraille-normal.ttf", "BlistaBraille", "normal")
        doc.setFont('BlistaBraille')
        doc.setLineHeightFactor(1)
        doc.setFontSize(10)
        doc.text(atkinson,1,1)
      }else{
        doc.addFileToVFS("MonospaceTypewriter.ttf", font2)
        doc.addFont("MonospaceTypewriter-normal.ttf", "MonospaceTypewriter", "normal")
        doc.setFont('MonospaceTypewriter')
        doc.setLineHeightFactor(1)
        doc.setFontSize(10)
        doc.text(ascii,1,1)
      }

      
      setPdfString(doc.output('datauri'))
      //doc.save('ascii.pdf')
},[])



    return(
        <div className='PdfForm'>
            <h2>PDF downloader options</h2>
            <h4>Paper size</h4>
            <div id='paperSizeContainer'>
                <section className='PdfCheckboxLabelContainer'>
                <label className='PdfCheckboxLabel' for = 'A2Checkbox'>A2</label>
                <input className='PdfCheckbox' id='A2Checkbox' type='checkbox'></input>
                </section>
                <section className='PdfCheckboxLabelContainer'>
                <label className='PdfCheckboxLabel' for = 'A3Checkbox'>A3</label>
                <input className='PdfCheckbox' id='A3Checkbox' type='checkbox'></input>
                </section >
                <section className='PdfCheckboxLabelContainer'>
                <label className='PdfCheckboxLabel' for = 'A4Checkbox'>A4</label>
                <input className='PdfCheckbox' id='A4Checkbox' type='checkbox'></input>
                </section>
                <section className='PdfCheckboxLabelContainer'>
                <label className='PdfCheckboxLabel' for = 'A4Checkbox'>A5</label>
                <input className='PdfCheckbox' id='A5Checkbox' type='checkbox'></input>
                </section>
                <section className='PdfCheckboxLabelContainer'>
                <label className='PdfCheckboxLabel' for = 'A6Checkbox'>A6</label>
                <input className='PdfCheckbox' id='A6Checkbox' type='checkbox'></input>
                </section>
            </div>
            <h4>Paper orientation</h4>
            <div id='paperOrientationContainer'>
                <section className='PdfCheckboxLabelContainer'>
                <img src={Vertical} alt="Vertical" className='PdfOrientationIcon'></img>
                <input className='PdfCheckbox' id='A3Checkbox' type='checkbox'></input>
                </section>
                <section className='PdfCheckboxLabelContainer'>
                <img src={Horizontal} alt="Horizontal" className='PdfOrientationIcon'></img>
                <input className='PdfCheckbox' id='A2Checkbox' type='checkbox'></input>
                </section>
            </div>
            <h4>PDF preview</h4>
            <div id='pdfCoordinateContainer'>
                <input type={"range"} min={"1"} max={"50"} id={"PdfHorizontalSlider"} className={"PdfSlider"}></input>
                <section id='pdfPreviewContainer'>
                    <input type={"range"} min={"1"} max={"50"} id={"PdfVerticalSlider"} className={"PdfSlider"}></input>
                    <iframe id='PdfPreview' title='pdf' src={pdfString} allow='fullscreen'/>
                </section>
            </div> 
            <div id='pdfButtonContainer'>
                <button className='BackgroundGreen'>Save</button>  
                <button className='BackgroundRed'>Cancel</button>
            </div>
        </div>
    )
}

export default PdfForm;