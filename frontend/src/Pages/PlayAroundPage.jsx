import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../index.css"
import  AsciiSettingsEssential  from "../Components/AsciiSettingsEssential/AsciiSettingsEssential"
import AsciiSettingsCharType from "../Components/AsciiSettingsCharType/AsciiSettingsCharType"
import AsciiSettingsOptional from "../Components/AsciiSettingsOptional/AsciiSettingsOptional"

const PlayAroundPage = () => {

  
  
    return(
      <div className="ElementBackground">
        <div className="FlexRowContainer">
          <AsciiSettingsEssential/>
          <AsciiSettingsCharType/>
          <AsciiSettingsOptional/>
        </div>
      </div>
    )
}

export default PlayAroundPage;