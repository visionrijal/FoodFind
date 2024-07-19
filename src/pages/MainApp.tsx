import { useEffect, useState } from 'react'
import { getAllTags, getRestaurantList } from '../utility/api';
import { useParams } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MainApp = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [topPicks, setTopPicks] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState();
  const handleFilter = (tagName) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tagName)) {
        // If tag is already selected, remove it
        return prevSelectedTags.filter(tag => tag !== tagName);
      } else {
        // If tag is not selected, add it
        return [...prevSelectedTags, tagName];
      }
    });
  };

  useEffect(() => {

    const fetchTags = async () => {
      const response = await getAllTags();
      setTags(response);
    }
    const fetchRestaurantList = async () => {
      const response = await getRestaurantList(selectedTags);
      setRestaurantList(response);
    };
    const fetchTopPicks = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/top-restaurants/"
      );
      setTopPicks(response.data);
    };
    fetchRestaurantList();
    fetchTopPicks()
    fetchTags();
  }, [selectedTags]);
  return (
    <>

      <Swiper pagination={{ dynamicBullets: true, }} autoplay={{ delay: 5000, }} modules={[Pagination, Autoplay]} className="mySwiper" spaceBetween={200} loop={true}>
        {
          topPicks.map((pick) => {
            return (
              <SwiperSlide>
              <div className="bg-bumblebee flex flex-col md:flex-row justify-evenly h-auto md:h-100 items-center text-bold rounded-2xl p-4 md:p-8 mt-14">
                <div className="w-full md:w-1/2 text-center text-primary-content md:text-left md:pr-8">
                  <p className="text-2xl uppercase bg-yellow-100 w-max mx-auto mb-4 md:mx-0 rounded-lg p-1 my-3">
                    Our Top Picks
                  </p>
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

      <section className='mt-14 w-full'>
        <p className='text-5xl text font-extrabold'>Restaurants</p>
        <div className="collapse collapse-arrow bg-primay mt-4">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-bumblebee text-primary-content peer-checked:bg-neutral-50 peer-checked:text-secondary-content">
            TAGS
          </div>
          <div className="collapse-content bg-primary text-primary-content peer-checked:bg-neutral-50 peer-checked:text-secondary-content">
            <div className='flex flex-wrap pb-5 items-center justify-evenly'>
              {
                tags?.map((tag) => (
                  <input
                    type='checkbox'
                    className="mr-2 btn btn-sm w-24 border-[0.5px] border-neutral-100 mt-5 mx-2 rounded-lg text-xs "
                    onChange={() => handleFilter(tag.name)}
                    checked={selectedTags.includes(tag.name)}
                    aria-label={tag.name}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </section>

      <section className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
        {restaurantList.map((restaurant) => (
          <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
            <div className="card bg-base-100 shadow-xl">
              <figure><img className="w-full h-80 object-cover" src={`${restaurant.images[0].image}`} alt="Restaurant" /></figure>
              <div className="card-body p-4">
                <h2 className="card-title text-lg font-bold">{restaurant.name}</h2>
                <p className='line-clamp-4 text-sm'>{restaurant.location}</p>
                <p className='line-clamp-4 text-sm'>{restaurant.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  )
}

export default MainApp