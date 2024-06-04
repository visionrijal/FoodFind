import { Link } from "react-router-dom"
import { googleLogout, hasGrantedAllScopesGoogle, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { useState } from "react";
import axios from "axios";

const Navbar = () => {
    const handleLogin = () => {
        login()
    };
    const [user, setUser] = useState({
        isAuthenticated: false,
        id: "", email: "", name: "", given_name: "", family_name: "Rjal", picture: "",
    });
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await axios.post(import.meta.env.VITE_USER_AUTHENTICATE_URL, {
                    access_token: tokenResponse.access_token
                });
                const { access, refresh, profile } = res.data
                setUser(profile)
            } catch (error) {
                console.log(error);

            }


        }
    });

    return (
        <>
            <nav className="flex justify-between items-center px-2 py-2 ">
                <Link to="/"> <p className="font-extrabold text-2xl"> FoodFind </p></Link>
                <div className="flex items-center gap-3">
                    <Link to="/restaurant"> <p className="text-md font-semibold"> Restaurants </p></Link>
                    <Link to="/food"> <p className="text-md font-semibold"> Food </p></Link>
                    {!user.isAuthenticated ?
                        (
                            <button onClick={() => handleLogin()} className="btn btn-primary">Login</button>
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
                </div>
            </nav>
        </>
    )
}

export default Navbar