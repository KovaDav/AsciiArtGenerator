import React, { useState, useEffect } from 'react';



function PdfForm() {
    return(
        <div className='pdfForm'>
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
            <label for = 'PdfPaperOrientation'>Orientation of paper</label>
            <input id='PdfPaperOrientation' type='dropdown'></input>
            <label for = 'PdfHorizontalSlider'>X starting coordinate</label>
            <input type={"range"} min={"1"} max={"50"} id={"PdfHorizontalSlider"} className={"PdfSlider"}></input>
            <label for = 'PdfVerticalSlider' className='PdfVerticalSliderDesc'>Y starting coordinate</label>
            <input type={"range"} min={"1"} max={"50"} id={"PdfVerticalSlider"} className={"PdfSlider"}></input>
        </div>
    )
}

export default PdfForm;