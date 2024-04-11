import { useEffect, useState } from "react";
import "./ProfilePageMozaique.css"
import StringPaper from "../StringPaper/StringPaper";

const ProfilePageMozaique = (artList) =>{
    
    const printMozaqiue = () =>{
        if(artList.artList !== null){
            return artList.artList.map(art => <section className="MozaiquePiece">{art[0]}</section>)
        }else{
            return 
        }
    }

    return(
        <div id="MozaiqueContainer">
            {printMozaqiue()}
        </div>
    )
}

export default ProfilePageMozaique