import { Link } from "react-router-dom"
import { useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// assets
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";


const Navbar = () => {

    // use theme from local storage if available or set light theme
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "bumblebee"
    );

    // update state on toggle
    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("bumblebee");
        }
    };

    // set theme state in localstorage on mount & also update localstorage on state change
    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        // add custom data-theme attribute to html tag required to update theme using DaisyUI
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
        // Check if user details are already stored in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogin = () => {
        login()
    };
    const handleLogout = () => {
        // Clear user details from localStorage and state
        localStorage.removeItem('user');
        setUser(null);
        navigate("/");
    };


    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await axios.post("http://localhost:8000/api/google-login/", {
                    token: tokenResponse.access_token
                });
                // Store user details in localStorage
                localStorage.setItem('user', JSON.stringify(res.data));
                setUser(res.data);
                navigate("/restaurant")
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <nav className="flex justify-between items-center px-2 py-2 ">
            <Link to="/"> <p className="font-extrabold text-2xl"> FoodFind </p></Link>
            <div className="flex items-center gap-3">

                {user === null ?
                    (
                        <button onClick={() => handleLogin()} className="btn btn-primary">Login</button>
                    ) :
                    <>
                        <Link to="/restaurant"> <p className="text-md font-semibold"> Restaurants </p></Link>
                        <Link to="/food"> <p className="text-md font-semibold"> Food </p></Link>
                        <button className="btn btn-accent btn-outline flex flex-around justify-center justify-items-center text-boldtext-center">
                            <div className="avatar">
                                <div className="w-8 rounded">
                                    <img className="" src={user?.profile_picture} />
                                </div>
                                <p className="p-2">{user?.username}</p>

                            </div>
                        </button>
                        <button onClick={() => handleLogout()} className="btn btn-secondary btn-outline">logout</button>
                    </>
                }
            </div>
            <div className="flex-none">
                {/* Toggle button here */}
                <button className="btn btn-square btn-ghost">
                    <label className="swap swap-rotate w-12 h-12">
                        <input
                            type="checkbox"
                            onChange={handleToggle}
                            // show toggle image based on localstorage theme
                            checked={theme === "bumblebee" ? false : true}
                        />
                        {/* light theme sun image */}
                        <img src={sun} alt="bumblebee" className="w-8 h-8 swap-on" />
                        {/* dark theme moon image */}
                        <img src={moon} alt="dark" className="w-8 h-8 swap-off" />
                    </label>
                </button>
            </div>
        </nav>
    )
}

export default Navbar