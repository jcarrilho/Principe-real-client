/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import EditProfilePage from "../EditProfile";

function YourProfilePage() {
    const storedToken = localStorage.getItem("authToken");

    const [userData, setUserData] = useState(null);

    const API_URL = import.meta.env.VITE_APP_SERVER_URL;


    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/auth/profile`,
                    {
                        headers: { Authorization: `Bearer ${storedToken}` },
                    }
                );
                setUserData(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUserData();
    }, []);

    return (
        <div style={{
            backgroundColor: 'rgba(142, 201, 199, 0.2)',
            borderRadius: '15px',
            marginTop: '25px',
            height: '69.6vh',
        }}>
            {userData && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#29584b'

                    
                }}>
                    <h1>Welcome, {userData.firstName} {userData.lastName}. This is your Profile.</h1>
                    <img src="/Images/logo P+R_VERDE_rgb-02 PEQUENO.png" style={{width: '300px'}}/>
                </div>
            )}
        </div>
    );
}

export default YourProfilePage;