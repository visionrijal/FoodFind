import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';


// Images 
import backSvg from '../assets/back.jpg';
import me from '../assets/team/me.jpg';
import broo from '../assets/team/broo.jpg';
import bishnu from '../assets/team/bishnu.jpg';


const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [topPicks, setTopPicks] = useState([]);

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

  return (
    <>
      {/* <img src={backSvg} alt="Background Image" className="mt-24 absolute inset-0 object-cover z-[-1] " /> */}

      {/* Content Section */}
      {/* <div className="relative h-screen">
      <section className="h-full py-8 mt-4 border-b flex justify-between items-center gap-20 relative z-10">
  <div className="w-1/2 flex-col basis-2/3">
    <h1 className="text-7xl font-black mt-0 mb-6"> 
      Find Instant Food <br />For Instant Hungers
    </h1>
  </div>
  <div className="w-1/2 flex-col basis-1/3">
    <div className="card w-full shadow-xl bg-primary">
      <div className="card-body">
        <h1 className="text-lg text-center font-bold">Find the complete food menu around you</h1>
        <p>
          We love finding new food and places to eat. Well what do you feel like eating today? Feel like going to a fancy place or maybe find some hot underrated place to eat. Eat it your way.
        </p>
      </div>
    </div>
  </div>
</section>


        <div
          className="absolute inset-0 bg-cover bg-center mt-12"
          style={{
            backgroundImage: `url(${backSvg})`,
            backgroundSize: 'cover',
            width:'200vh',
            marginLeft:'-15vh',
            transform:'scale(1.1)'
          }}
        ></div>
      </div> */}

            <section className='py-8 border-b'>
        <section className='flex justify-between items-center gap-20'>
          <div className='w-1/2 flex-col basis-2/3'>
            <h1 className='text-7xl font-black'>
              Find Instant Food <br />For Instant Hungers
            </h1>
            <img className='pt-3 w-3/4' src="\src\assets\10273781.jpg" alt="" />
          </div>
          <div className='w-1/2 flex-col  basis-1/3'>
            <div className="card w-full shadow-xl bg-primary">
              <div className="card-body">
                <h1 className='text-lg text-center font-bold'> Find the complete food menu around you</h1>
                <p>
                  We love finding new food and places to eat. Well what do you feel like eating today? Feel like going to a fancy place or maybe find some hot underrated place to eat. Eat it your way.
                </p>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
            <img className='pt-3 w-full ' src="src\assets\39181.jpg" alt="" />
          </div>
        </section>
        </section>


      {/* Featured Restaurants Section */}
      <section className="py-8">
        <h1 className="text-4xl font-extrabold text-center mt-8">Featured Restaurants</h1>
        <Swiper pagination={{ dynamicBullets: true, }} autoplay={{ delay: 5000, }} modules={[Pagination, Autoplay]} className="mySwiper" spaceBetween={200} loop={true}>
          {
            topPicks.map((pick) => {
              return (
                <SwiperSlide>
                  <div className="bg-primary flex flex-col md:flex-row justify-evenly h-auto md:h-100 items-center text-bold rounded-2xl p-4 md:p-8 mt-14">
                    <div className="w-full md:w-1/2 text-center md:text-left md:pr-8">
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