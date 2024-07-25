import { Link } from "react-router-dom"
import { useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AddRestaurantModal from './AddRestaurantModal.tsx';

// assets
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import { getRestaurantList } from '../utility/api';

const Navbar = () => {

    // use theme from local storage if available or set light theme
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "bumblebee");
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef(null);
    

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dracula");
        } else {
            setTheme("bumblebee");
        }
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogin = () => {
        login()
    };

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        navigate("/");
    };


    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await axios.post("http://localhost:8000/api/google-login/", {
                    token: tokenResponse.access_token
                });
                // Store user details including joined date/time in localStorage
                const userData = {
                    ...res.data,
                    joined: new Date().toISOString() // Capture current time
                };
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                navigate("/restaurant"); // Redirect to restaurant
            } catch (error) {
                console.log(error);
            }
        }
    });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.length >= 1) {
            try {
                const results = await getRestaurantList([query]);
                const filteredResults = results
                    .filter(result => result.name.toLowerCase().startsWith(query.toLowerCase()))
                    .slice(0, 5);
                setSearchResults(filteredResults);
                setSelectedIndex(-1); // Reset selectedIndex when search results are updated
            } catch (error) {
                console.error('Error searching for restaurants:', error);
            }
        } else {
            setSearchResults([]);
            setSelectedIndex(-1);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setSelectedIndex(-1);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchQuery('');
                setSearchResults([]);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSuggestionClick = (id) => {
        navigate(`/restaurant/${id}`);
        setSearchQuery('');
        setSearchResults([]);
        setSelectedIndex(-1);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
                handleSuggestionClick(searchResults[selectedIndex].id);
            }
        } else if (event.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => (prevIndex + 1) % searchResults.length);
        } else if (event.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => (prevIndex - 1 + searchResults.length) % searchResults.length);
        }
    };

    return (
        <>
        {/* Overlay */}
        {isMenuOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={toggleMenu}
            ></div>
        )}
        <nav className="flex justify-between items-center px-4 py-2">
            <Link to="/"> <p className="font-extrabold text-2xl mr-20"> FoodFind </p></Link>

            {user === null ?
                (
                    <button onClick={() => handleLogin()} className="btn btn-primary">Login</button>
                ) :
                <>
                    <div className="hidden lg:flex items-center lg:space-x-4">
                        <Link to="/restaurant" className="text-2xl font-bold relative group mr-6">
                            <span className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-bumblebee after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">Restaurants</span>
                        </Link>
                        <Link to="/map" className="text-2xl font-bold relative group pl-6">
                            <span className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-bumblebee after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">Find Restaurants</span>
                        </Link>
                    </div>

                    {/* Middle gap */}
                    <div className="flex-grow"></div>

                    {/* Default Navbar*/}
                    <div className="hidden lg:flex justify-between items-center lg:space-x-4">
                        {/* Add Restaurant Button */}
                        <button onClick={openModal} className="btn btn-primary bg-bumblebee border-none hover:bg-yellow-500 mr-4">Add a Restaurant</button>

                        {/* Search bar */}
                        <div ref={searchRef} className="relative form-control mr-10">
                            <input
                                type="text"
                                placeholder="Search"
                                className="input input-bordered-yello border-bumblebee w-full px-2"
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2"
                                    onClick={handleClearSearch}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                            {searchResults.length > 0 && (
                                <ul className="absolute bg-white border border-gray-200 mt-12 w-full z-10 search-list">
                                    {searchResults.map((result, index) => (
                                        <li 
                                            key={result.id} 
                                            className={`search-list-item cursor-pointer p-2 hover:bg-gray-100 ${selectedIndex === index ? 'bg-gray-200' : ''}`}
                                            onClick={() => handleSuggestionClick(result.id)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                        >
                                            {result.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Theme Toggle */}
                    <div className="flex-none ml-6 mr-3">
                        <button className="btn btn-square btn-ghost">
                            <label className="swap swap-rotate w-12 h-12">
                                <input
                                    type="checkbox"
                                    onChange={handleToggle}
                                    checked={theme === "bumblebee" ? false : true}
                                />
                                <img src={sun} alt="bumblebee" className="w-8 h-8 swap-on" />
                                <img src={moon} alt="dracula" className="w-8 h-8 swap-off" />
                            </label>
                        </button>
                    </div>

                    {/* User Profile Dropdown */}
                    <div className="flex-none mr-3">
                        <div className="dropdown ml-auto dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    {user && (
                                        <img className="" src={user?.profile_picture} />
                                    )}
                                </div>
                                {/* <p className="p-2">{user?.username && user?.username.split(' ')[0]}</p> */}
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[50] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li className="border-b border-gray-200">
                                    <p className="p-2">{user?.username}</p>
                                </li>
                                <Link to="/profile">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                </Link>
                                {/* <li><a>Settings</a></li> */}
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
                    </div>
                </>
            }


            {/* Hamburger Menu*/}
            {user !== null && (
                <button className="block lg:hidden btn btn-square btn-ghost ml-auto px-2 py-2" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            )}

            {/* Responsive Sidebar*/}
            {user !== null && (
                <div className={`lg:hidden fixed border-l-4 border-bumblebee top-0 right-0 h-full z-50 transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} ${theme === 'dracula' ? 'bg-gray-800' : 'bg-white'}`} style={{ width: '230px' }}>
                    {/* Close button */}
                    <button className="absolute top-1 right-0 mt-2 mr-4 btn btn-square btn-ghost" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Menu Items */}
                    <div className="mx-1 my-5">
                        <Link to="/"> <p className="font-extrabold text-2xl">FoodFind</p> </Link>
                        {/* Search bar (duplicate for responsiveness) */}
                         {/* Search bar */}
                        <div ref={searchRef} className="relative form-control mt-10">
                        <input
                                type="text"
                                placeholder="Search"
                                className="input input-bordered-yello border-bumblebee w-full px-2"
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2"
                                    onClick={handleClearSearch}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                            {searchResults.length > 0 && (
                                <ul className="absolute bg-white border border-gray-200 mt-12 w-full z-10 search-list">
                                    {searchResults.map((result, index) => (
                                        <li 
                                            key={result.id} 
                                            className={`search-list-item cursor-pointer p-2 hover:bg-gray-100 ${selectedIndex === index ? 'bg-gray-200' : ''}`}
                                            onClick={() => handleSuggestionClick(result.id)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                        >
                                            {result.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                            <div className="mb-6 mx-1 my-10">
                                <Link to="/restaurant" className="flex items-center px-2 border-b border-bumblebee hover:text-yellow-500">
                                    <p className="text-md font-extrabold">Restaurants</p>
                                </Link>
                                <Link to="/map" className="flex items-center mt-4 px-2 border-b border-bumblebee hover:text-yellow-500">
                                    <p className="text-md font-extrabold">Find Restaurants</p>
                                </Link>
                                {/* Add Restaurant Button */}
                                <button onClick={openModal} className="btn btn-primary mt-4 bg-bumblebee border-none hover:bg-yellow-500 mr-4">Add a Restaurant</button>
                            </div>
                    </div>
                </div>
            )}


            {/* Add Restaurant Modal */}
            {isModalOpen && <AddRestaurantModal closeModal={closeModal} />}

        </nav>
        </>
    )
}

export default Navbar