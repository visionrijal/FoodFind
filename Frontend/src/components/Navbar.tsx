import { Link } from "react-router-dom"
import { googleLogout, hasGrantedAllScopesGoogle, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Navbar = () => {
    const handleLogin = () => {
        login()
    }
    const [user, setUser] = useState({
        isAuthenticated: false,
        id: "", email: "", verified_email: true, name: "", given_name: "", family_name: "Rjal", picture: "", locale: ""
    })
    let access_token = "";

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            access_token = tokenResponse.access_token
            localStorage.setItem('foodfindtoken', access_token)
            setUserDetailsFromToken()
        }
    });

    const setUserDetailsFromToken = () => {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                setUser({ ...res.data, isAuthenticated: true })
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <nav className="flex justify-between items-center px-2 py-2 border-b">
                <Link to="/"> <p className="font-extrabold text-2xl"> FoodFind </p></Link>
                {!user.isAuthenticated ?
                    (
                        <button onClick={() => handleLogin()} className="btn btn-primary">Use App</button>
                    ) :
                    <button className="btn btn-accent btn-outline flex flex-around justify-center justify-items-center text-boldtext-center">
                        <div className="avatar">
                            <div className="w-8 rounded">
                                <img className="" src={user.picture} />
                            </div>
                            <p className="p-2">{user.name}</p>
                        </div>
                    </button>


                }
            </nav>
        </>
    )
}

export default Navbar