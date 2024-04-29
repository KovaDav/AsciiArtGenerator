import { useEffect, useState } from "react";
import "./ProfilePageMozaique.css"
import ArtInspector from "../ArtInspector/ArtInspector";

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
        {showArt ? <ArtInspector id="ArtInspectorContainer" colorInverted={inspectedArtData[2]} string={inspectedArtData[1].toString()} type={inspectedArtData[3]} setShowArt={setShowArt} showArt={showArt}/> :
        <div id="MozaiqueContainer">
            {printMozaqiue()}
        </div>
}
        </>
    )
}

export default ProfilePageMozaique