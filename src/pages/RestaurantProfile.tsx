import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
// Import Swiper React components
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Tabs, Tab } from '../components/Tabs';
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Modal } from '../components/Modal';
import { useParams } from 'react-router-dom';
import { getRestaurantDetails, markAsFavorite } from '../utility/api';


const RestaurantProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const { restaurantId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    
    const setLocalFavouriteRestaurant = async ()=>{
         // console.log(`Fetching favorite restaurants for user ${userId}`);
         const response = await axios.get(`http://127.0.0.1:8000/api/favorite-restaurants/${user.id}/`);
         // console.log('Favorite Restaurants Data:', response.data); // Print the data
        response.data.forEach((data)=>{
         localStorage.setItem(`restaurant_${data.id}_favorite`,"true");
        })
    }
    setLocalFavouriteRestaurant()
    const fetchRestaurantDetails = async () => {
      try {
        const response = await getRestaurantDetails(restaurantId);
        setRestaurantDetails(response);
        const initialFavoriteState = localStorage.getItem(`restaurant_${restaurantId}_favorite`) === 'true';
        setIsFavorite(initialFavoriteState); // Set initial favorite state from local storage
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  const swiper = useRef<SwiperClass>(null!);


  function generateArray(n) {
    return Array.from({ length: n }, (_, i) => i + 1);
  }

  // Function to handle marking a restaurant as favorite
  const toggleFavorite = async () => {
    try {
      await markAsFavorite(restaurantId, user.id, !isFavorite);
      setIsFavorite(!isFavorite); // Toggle favorite state locally
      localStorage.setItem(`restaurant_${restaurantId}_favorite`, (!isFavorite).toString());

      console.log(`Marked ${restaurantDetails?.name} as ${!isFavorite ? 'favorite' : 'not favorite'}`);
    } catch (error) {
      console.error('Error marking favorite:', error);
    }
  };

  const [showModal, setShowModal] = useState(false)


  return (
    <section className='md:grid md:grid-cols-5 mt-14 rounded-lg gap-4 md:gap-8'>
      <div className='md:col-span-3 row-span-1 flex justify-center mb-10'>
        <div className='max-w-[600px] md:max-w-[100%]'>
          <Swiper
            loop={true}
            pagination={true}
            watchSlidesProgress={true}
            spaceBetween={10}
            thumbs={{ swiper: swiper.current }}
            modules={[Pagination, Thumbs]}
            className='mySwiper2'
          >
            {restaurantDetails?.images.map((imageObj, index) => (
              <SwiperSlide key={index}>
                <img
                  className='h-[300px] w-[100%] md:h-[550px] rounded-2xl object-cover'
                  src={imageObj.image}
                  alt={`Slide ${index}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className='flex flex-col col-span-2 m-2 row-span-2 gap-8 '>
        <div className=''>
          <p className='text-3xl text-'>{restaurantDetails?.name}</p>
          <div className="rating rating-md mt-2 gap-0.5">
            <input type="radio" name={restaurantDetails?.id + "avgrating"} className="mask mask-heart bg-yellow-400 hidden" checked disabled />
            {
              generateArray(5).map((i) => {
                if ((i) <= restaurantDetails?.average_rating) {
                  return (

                    <input type="radio" name={restaurantDetails?.id + "avgrating"} className="mask mask-heart bg-yellow-400" disabled checked readOnly />
                  )
                }
                else {
                  return (<input type="radio" name={restaurantDetails?.id + "avgrating"} className="mask mask-heart bg-yellow-400" disabled readOnly />)
                }
              })
            }

            <div className=''>{`(${restaurantDetails?.no_of_reviews})`}</div>
          </div>
          <p className='mt-3 flex flex-wrap gap-0.5 justify-start text-xs'>{
            <>
              <p>{restaurantDetails?.location}</p>
              <div className="divider divider-horizontal mx-0.5"></div>
              <p>{restaurantDetails?.price}</p>
              <div className="divider divider-horizontal mx-0.5"></div>
              <p>{restaurantDetails?.opening_hours}</p>
            </>
          }</p>

          <p className='mt-3 w-full bg-slate-100 text-primary-content rounded-lg p-3 '>{restaurantDetails?.description}</p>
          <div className='mt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-[-1]'>
            <button className='btn bg-bumblebee hover:bg-yellow-500 border-none btn-primary w-72 mt-8' onClick={() => setShowModal(true)}>Add Review</button>
            {/* Favorite button */}
            <button className='btn btn-primary hover:bg-yellow-500 bg-bumblebee border-none mt-8 w-72' onClick={toggleFavorite}>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-7 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-500'}`} viewBox="0 0 21 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className='h-96'>
          <Tabs>
            <Tab label="Map">
              <div className="App">
                <iframe
                  className='rounded-2xl'
                  src={`https://maps.google.com/maps?&q=${encodeURIComponent(restaurantDetails?.name + "," + restaurantDetails?.location)}&output=embed`}
                  width={"100%"}
                  height={"500px"}
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  aria-hidden="true"
                  tabIndex={0}

                />
              </div>
            </Tab>
            <Tab label="Menu">
              <div className="p-1 h-96 overflow-scroll rounded-xl " style={{ scrollbarGutter: "stable" }}>
                <div className='  h-full'>
                  {
                    restaurantDetails?.menu_items.map((item) => {
                      return (
                        <div className='flex items-center justify-between  border-[0.5px] border-neutral-300 p-1 my-2 rounded-lg'>
                          <span className='text-2xl'>{item.name}</span>
                          <span className='text-xl text-right'>{item.price}</span>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>


      <div className='mt-48 md:mt-0 md:col-span-3 md:row-span-3 h-full w-full p-2'>
        <p className='text-3xl'>Reviews</p>
        <div className='tags my-2 flex flex-wrap gap-2 justify-center'>
          {
            restaurantDetails?.tags.map((tag) => {
              return <span className="badge min-w-20 p-2">{tag?.name}</span>
            })
          }
        </div>
        <div className='reviews overflow-auto flex flex-col gap-3 h-96 md:h-80 mt-5 rounded-lg'>
          {
            !restaurantDetails?.no_of_reviews && <p className='text-4xl mt-5 rounded-xl text-neutral-200 border-[0.5px] border-neutral-200 h-32 flex items-center w-full justify-center'>"NO REVIEWS YET"</p>
          }
          {
            restaurantDetails?.reviews.map((review) => {
              return (
                <div className="user-rating bg-default-50 flex flex-col gap-3 rounded-md border-[0.5px] border-neutral-300 p-3 text-base justify-start">
                  <div className="user-details flex gap-3 items-center">
                    <img className=" rounded-full w-6 h-6" src={review.user.profile_picture ?? "https://api.multiavatar.com/" + review.user.username + ".png"} />
                    <p className='text-xl'>{review.user.username.split('_')[0]}</p>
                    <div className="rating rating-sm">
                      {
                        [1, 2, 3, 4, 5].map((i) => {
                          return (
                            <input type="radio" name={review.id + "userreview"} className="mask mask-heart bg-yellow-400" checked={i == review.rating} disabled />
                          )
                        })
                      }
                    </div>
                  </div>
                  <div className='review-text '>
                    <p>{review?.review_text}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <Modal userId={user.id} title="add review" id={restaurantDetails?.id} text="add a review" visible={showModal} onClose={() => setShowModal(false)} restaurantId={restaurantId} />
    </section>
  )
}

export default RestaurantProfile    