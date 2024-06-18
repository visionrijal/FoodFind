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
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle
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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <nav className="flex justify-between items-center px-0 py-2">
            <Link to="/"> <p className="font-extrabold text-2xl"> FoodFind </p></Link>

            {/* Hamburger Mwnu */}
            {user !== null && (
            <button className="block ml-auto lg:hidden btn btn-square btn-ghost" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            )}

            <div className={`lg:flex ml-auto lg:items-center gap-3`}>
                {user === null ?
                    (
                        <button onClick={() => handleLogin()} className="btn btn-primary">Login</button>
                    ) :
                    <>

                        {/* Search bar and Profile */}
                        <div className={`navbar lg:flex ml-auto lg:items-center gap-3 bg-base-100 ${isMenuOpen ? 'block' : 'hidden'}`}>
                            <div className="flex-none gap-2">
                                <div className="form-control">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="input input-bordered w-24 md:w-auto"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSearch(e.target.value);
                                            }
                                        }}
                                    />
                                </div>

                                <Link to="/restaurant"> <p className="text-md font-semibold"> Restaurants </p></Link>
                                <Link to="/food"> <p className="text-md font-semibold"> Food </p></Link>
                            </div>
                        </div>

                        {/* User Profile Dropdown */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img className="" src={user?.profile_picture} />
                                </div>
                                {/* <p className="p-2">{user?.username && user?.username.split(' ')[0]}</p> */}
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li className="border-b border-gray-200">
                                    <p className="p-2">{user?.username}</p>
                                </li>
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a onClick={() => handleLogout()}>Logout</a></li>
                            </ul>
                        </div>

                        {/* <button className="btn btn-accent btn-outline flex flex-around justify-center justify-items-center text-boldtext-center">
                            <div className="avatar">
                                <div className="w-8 rounded">
                                    <img className="" src={user?.profile_picture} />
                                </div>
                                <p className="p-2">{user?.username}</p>

                            </div>
                        </button> 
                        <button onClick={() => handleLogout()} className="btn btn-secondary btn-outline">logout</button>*/}
                    </>
                }
            </div>



            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <label className="swap swap-rotate w-12 h-12">
                        <input
                            type="checkbox"
                            onChange={handleToggle}
                            checked={theme === "bumblebee" ? false : true}
                        />
                        <img src={sun} alt="bumblebee" className="w-8 h-8 swap-on" />
                        <img src={moon} alt="dark" className="w-8 h-8 swap-off" />
                    </label>
                </button>
            </div>
        </nav>
    )
}

export default Navbar