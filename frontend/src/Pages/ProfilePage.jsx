import { useEffect } from "react";
import { useState } from "react";
import "../index.css"
import ProfilePageMozaique from "../Components/ProfilePageMozaique/ProfilePageMozaique";
import {useKindeAuth} from "@kinde-oss/kinde-auth-react";

const ProfilePage = () =>{
    const { user } = useKindeAuth();
    const [artList, setArtList] = useState(null)
    useEffect(() => {
        fetch(
            `http://localhost:5000/profile/list`
            //`https://KovaDav.eu.pythonanywhere.com/profile/list`
            ,
            {
            method: 'POST',
            headers: {
            "UserID" :  user.id,
            }
            })
            .then((response) => response.json()
            )
            .then((result) => {	
				setArtList(result)
			})
            .catch((error) => {
            console.error('Error:', error);
        });
        
    }, [])

    return(
        <div className="ElementBackground">
        <ProfilePageMozaique artList={artList}></ProfilePageMozaique>
        </div>
    )
}
export default ProfilePage;