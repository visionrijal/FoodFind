import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getRestaurantList } from '../utility/api';


// Images 
import back from '../assets/back.png'
import me from '../assets/team/me.jpg';
import broo from '../assets/team/broo.jpg';
import bishnu from '../assets/team/bishnu.jpg';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); // Ensure suggestions is defined
  const [topPicks, setTopPicks] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopPicks = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/top-restaurants/');
      setTopPicks(response.data);
    };
    fetchTopPicks();
  }, []);

  const teamMembers = [
    { id: 1, name: 'Pradip Dhungana', role: 'Backend', imageUrl: me },
    { id: 2, name: 'Vision Rijal', role: 'Frontend', imageUrl: broo },
    { id: 3, name: 'Bishnu Timilsena', role: 'Backend', imageUrl: bishnu },
  ];

  const handleSearch = async (query) => {
    if (query.length >= 1) {
      try {
        const results = await getRestaurantList([query]);
        // Find the restaurant that matches exactly with the search query
        const matchedRestaurant = results.find(
          result => result.name.toLowerCase() === query.toLowerCase()
        );
        if (matchedRestaurant) {
          navigate(`/restaurant/${matchedRestaurant.id}`);
        } else {
          // Optionally handle cases where no exact match is found
          console.log("No exact match found");
        }
      } catch (error) {
        console.error('Error searching for restaurants:', error);
      }
    }
  };

  const handleSearchButtonClick = () => {
    handleSearch(searchQuery);
  };

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length >= 3) {
      try {
        const results = await getRestaurantList([query]);
        const filteredSuggestions = results
          .filter(result => result.name.toLowerCase().startsWith(query.toLowerCase()))
          .slice(0, 5);
        setSuggestions(filteredSuggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name) => {
    setSearchQuery(name);
    setSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${back})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }}
        ></div>
        {/* <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
 */}
        <motion.div 
          className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col justify-center h-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-5xl font-extrabold mb-8 text-black"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            Discover Your New Favorite Restaurant
          </motion.h1>
          <motion.p 
            className="text-lg mb-12 text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Explore the best restaurants in your area, and discover new flavors and cuisines.
          </motion.p>
          <motion.div 
            className="search-bar flex flex-col sm:flex-row mt-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div ref={searchRef} className="relative w-full sm:w-3/4 lg:w-1/2 xl:w-3/4">
              <input
                type="search"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search for restaurants, cuisines, or dishes"
                className="w-full px-4 py-2 text-lg rounded-lg border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
              />
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border z-50 border-gray-300 rounded-lg mt-1 shadow-lg">
                  {suggestions.map(suggestion => (
                    <div
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion.name)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {suggestion.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleSearchButtonClick}
              className="bg-yellow-400 hover:bg-yellow-500 text-lg font-bold py-2 px-4 rounded-lg shadow-lg mt-4 sm:mt-0 sm:ml-4 transition-transform transform hover:scale-105"
            >
              Search
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Restaurants Section */}
      <section className="py-8">
        <h1 className="text-4xl font-extrabold text-center mt-8">Featured Restaurants</h1>
        <Swiper pagination={{ dynamicBullets: true, }} autoplay={{ delay: 5000, }} modules={[Pagination, Autoplay]} className="mySwiper" spaceBetween={200} loop={true}>
          {
            topPicks.map((pick) => {
              return (
                <SwiperSlide>
                  <div className="bg-bumblebee flex flex-col md:flex-row justify-evenly h-auto md:h-100 items-center text-bold rounded-2xl p-4 md:p-8 mt-14">
                    <div className="w-full md:w-1/2 text-center text-primary-content md:text-left md:pr-8">
                      <h1 className="text-4xl uppercase">{pick.restaurant.name}</h1>
                      <p>{pick.restaurant.location}</p>
                      <p className="line-clamp-3 mt-5">
                        {pick.restaurant.description}
                      </p>
                      <Link to={`/restaurant/${pick.restaurant.id}`}>
                        <button className="mt-8 bg-slate-50 text-yellow-600 hover:bg-slate-100 py-2 px-10 rounded-lg">
                          View Restaurant
                        </button>
                      </Link>
                    </div>
                    <div className="w-full md:w-auto mt-6 md:mt-0 flex justify-center">
                      <div className="w-96 h-80">
                        <img
                          className="rounded-lg w-full h-full object-cover"
                          src={pick.restaurant.images[0].image}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </section>

      {/* About US */}
      {/* <div className="bg-grey-100 py-12 rounded shadow-md"> */}
      <div className=" py-12 rounded">
        <div className="max-w-6xl mx-auto px-8 ">
          <section className="py-12">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-extrabold mb-8">About Us</h1>
              <p className="text-lg mt-2">
                FoodFind is a webapp that helps users discover delicious food at local restaurants and small businesses.
              </p>
            </div>

            {/* Our Mission Section */}

            <div className="mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg">
                FoodFind's mission is to connect people with quality food experiences by helping them find the perfect place to dine, based on their preferences and location.
              </p>
            </div>


            {/* Our Vision Section */}

            <div className="mx-auto ">
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg ">
                Our vision is to create a community-driven platform where users can share their love for food, discover new dining spots, and help restaurants thrive by showcasing their best offerings to a wider audience.
              </p>
            </div>


            {/* Our Team Section */}
            <section className="mt-16">
              <div className="mx-auto mb-14">
                <h2 className="text-3xl font-bold mb-6">Our Team</h2>
                <p className="text-lg  mb-8">
                  Meet the talented individuals who make it all possible.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Team Member Cards */}
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="rounded-full h-28 w-28 object-cover shadow-md"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Add hover effect or overlay if needed */}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
                    <p className="text-gray-500 mb-4">{member.role}</p>
                  </div>
                ))}
              </div>
            </section>

          </section>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Home;