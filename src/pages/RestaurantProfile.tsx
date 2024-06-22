import { useEffect, useRef, useState } from 'react';
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
import { getRestaurantDetails } from '../utility/api';


const RestaurantProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const { restaurantId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState();
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      const response = await getRestaurantDetails(restaurantId);
      setRestaurantDetails(response);
    };
    fetchRestaurantDetails()
  }, [restaurantId])

  const swiper = useRef<SwiperClass>(null!);

  function generateArray(n) {
    return Array.from({ length: n }, (_, i) => i + 1);
  }
  const isFavourite = true
  const [showModal, setShowModal] = useState(false)
  return (
    <section className='md:grid md:grid-cols-5 mt-5 rounded-lg gap-4 md:gap-8'>
      <div className=' md:col-span-3 row-span-1'>
        <Swiper
          loop={true}
          pagination={true}
          watchSlidesProgress={true}
          spaceBetween={10}
          thumbs={
            { swiper: swiper.current }
          }
          modules={[Pagination, Thumbs]}
          className="mySwiper2"
        >
          {
            restaurantDetails?.images.map((imageObj) => {
              return (
                <SwiperSlide>
                  <img className='h-[300px] w-[500px] md:h-[550px] md:w-full rounded-2xl' src={imageObj.image} />
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
      <div className='flex flex-col col-span-2 row-span-2 gap-8 '>
        <div className=''>
          <p className='text-3xl text-'>{restaurantDetails?.name}</p>
          <div className="rating rating-md">
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
          <p className='mt-3 w-full bg-slate-100 rounded-lg p-3 '>{restaurantDetails?.description}</p>
          <div className='mt-2 flex items-center justify-start gap-3 h-14'>
            <button className='btn btn-primary w-80' onClick={() => setShowModal(true)}>add review</button>


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
      <div className='mt-48 md:col-span-3 md:row-span-3 h-full w-full p-2'>
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