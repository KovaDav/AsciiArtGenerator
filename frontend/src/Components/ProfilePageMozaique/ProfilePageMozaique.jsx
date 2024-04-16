import { useEffect, useState } from "react";
import "./ProfilePageMozaique.css"
import StringPaper from "../StringPaper/StringPaper";

const ProfilePageMozaique = (artList) =>{
    const [inspectedArtData, setInspectedArtData] = useState([])
    const [showArt, setShowArt] = useState(false)
    const printMozaqiue = () =>{
        if(artList.artList !== null){
            return artList.artList.map(art =><section className="MozaiquePiece">
                {art[0]}
                <button onClick={() => {setInspectedArtData(art); setShowArt(!showArt)}}>show</button>
            </section>)
        }else{
            return 
        }
    }

    return(
        <>
            {showArt && <StringPaper id="ArtInspector" colorInverted={inspectedArtData[2]} string={inspectedArtData[1].toString()} setColorInverted={inspectedArtData[2]} type={inspectedArtData[3]}/>}
        <div id="MozaiqueContainer">
            {printMozaqiue()}
        </div>
        </>
    )
}

export default ProfilePageMozaique