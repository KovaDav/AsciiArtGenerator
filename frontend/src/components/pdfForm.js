import React, { useState, useEffect } from 'react';

function PdfForm() {
    return(
        <div className='pdfForm'>
            <h2>PDF downloader options</h2>
            <label for = 'PdfPaperSize'>Size of paper</label>
            <input id='PdfPaperSize' type='dropdown'></input>
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