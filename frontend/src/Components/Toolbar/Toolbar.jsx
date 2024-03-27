
import Paper from '@mui/material/Paper';
import "./Toolbar.css"
import Optional from "../AsciiSettingsOptional/AsciiSettingsOptional"

const Toolbar = (isAuthenticated) => {


    return(
        <section id='Toolbar'>
        <>
            <button className='toolbarButton' >Home</button>
            {!isAuthenticated &&<> <button className='toolbarButton' >Login</button> <button className='toolbarButton' >Register</button></>}
            <button className='toolbarButton' >Leaderboard</button>
            {isAuthenticated && <button className='toolbarButton' >Logout</button>}
        </>
        </section>
    )
}

export default Toolbar