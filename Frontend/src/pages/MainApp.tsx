import { useEffect, useState } from 'react'
import { getExploreRestaurants, getTopPicks } from '../utility/api';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

const MainApp = () => {
  const id = 100;
  const [topPicks, setTopPicks] = useState([]);
  const [explore, setExplore] = useState([]);
  useEffect(() => {
    const fetchTopPicks = async () => {
      const topPicksData = await getTopPicks();
      setTopPicks(topPicksData);

    };
    const fetchExploreRestaurants = async () => {
      const exploreData = await getExploreRestaurants();
      setExplore(exploreData);
    };
    fetchTopPicks();
    fetchExploreRestaurants();
  }, []);
  const top_restaurant_swiper = []
  for (let i = 0; i < 3; i++) {
    top_restaurant_swiper.push(
      <SwiperSlide>
        <div className="bg-primary flex justify-evenly h-96 items-center text-bold rounded-2xl">
          <div className="w-1/2">
            <p className='text-2xl uppercase bg-yellow-100 w-max rounded-lg p-1 my-3'>Our Top Picks</p>
            <h1 className="text-4xl uppercase">chi chi</h1>
            <p>macchinra marga, nepal , 5star</p>

            <p className="line-clamp-3 mt-5">
              Welcome to Cafe De Patan, situated near Patan Durbar Square, where
              the fragrant aromas of Nepali spices mingles with modern dishes.
              Step into our intimate cafe-like restaurant, where every corner is
              infused with the rich traditions of Thakali and Newari cuisine.
              Settle into a plush seat and prepare to embark on a culinary
              journey through the vibrant flavors of Nepal, where each dish
              tells a story of heritage and culinary craftsmanship.
            </p>
            <Link to={ `/restaurant/${id}`}>
              <button className=" mt-8 bg-slate-50 text-yellow-600  hover:bg-slate-100 py-2 px-10 rounded-lg ">
                View Restaurant
              </button>
            </Link>

          </div>
          <div>
            <img
              className="rounded-lg w-96"
              src="https://noshnepal.com/_next/image?url=https%3A%2F%2Fnoshnepal.s3.ap-southeast-1.amazonaws.com%2F60be796f-14fe-4483-bb4b-6fb2e60193a7image&w=640&q=75"
              alt=""
            />
          </div>
        </div>
      </SwiperSlide>
    )
  }
  const restaurant_explore = []

  for (let i = 0; i < 10; i++) {
    restaurant_explore.push(
      <Link to={`/restaurant/${id}`}>
        <div className="card w-full  bg-base-100 shadow-xl">
          <figure><img src="https://noshnepal.com/_next/image?url=https%3A%2F%2Fnoshnepal.s3.ap-southeast-1.amazonaws.com%2F60be796f-14fe-4483-bb4b-6fb2e60193a7image&w=640&q=75" alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
            </div>
          </div>
        </div>
      </Link>
    )
  }
  return (
    <>

      <Swiper pagination={{ dynamicBullets: true, }} autoplay={{ delay: 5000, }} modules={[Pagination, Autoplay]} className="mySwiper" spaceBetween={200} loop={true}>
        {top_restaurant_swiper}
      </Swiper>
      <section className='mt-14 w-full'>
        <p className='text-5xl text '>Restaurants</p>
        <div className=' flex flex-wrap pb-5'>
          <span className="btn btn-sm  w-24  badge-primary mt-5 mx-2 rounded-lg ">Badge</span>
          <span className="btn btn-sm  w-24  badge-primary mt-5 mx-2 rounded-lg ">Badge</span>
          <span className="btn btn-sm  w-24  badge-primary mt-5 mx-2 rounded-lg ">Badge</span>
          <span className="btn btn-sm  w-24  badge-primary mt-5 mx-2 rounded-lg ">Badge</span>
          <span className="btn btn-sm  w-24  badge-primary mt-5 mx-2 rounded-lg ">Badge</span>
          <span className="btn btn-sm  w-24  badge-primary mt-5 mx-2 rounded-lg ">Badge</span>
          <span className="btn btn-sm  w-24  badge-primary mt-5 mx-2 rounded-lg ">Badge</span>
        </div>
      </section>
      <section className='grid grid-cols-3 mt-8 gap-8'>
        {
          restaurant_explore
        }
      </section>
    </>
  )
}

export default MainApp