import { useRef, useState } from 'react';
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


const RestaurantProfile = () => {
  // const {restaurantId} = useParams();
  const swiper = useRef<SwiperClass>(null!);
  const MapStyle = {
    width: "100%",
    height: 500
  };
  const isFavourite = true
  const [showModal,setShowModal]= useState(false)
  return (
    <section className='grid grid-cols-5 mt-5 rounded-lg gap-8'>
      <div className=' col-span-3 row-span-1'>
        <Swiper
          loop={true}
          pagination={{
            el: ".swiper-pagination", // Use a valid DOM element here
            type: "progressbar",
            clickable: true,
            bulletClass: "bg-red-300",
            bulletActiveClass: "bg-red-300",
          }}
          watchSlidesProgress={true}
          spaceBetween={10}
          thumbs={
            { swiper: swiper.current }
          }
          modules={[FreeMode, Navigation, Pagination, Thumbs]}
          className="mySwiper2"
        >
          <SwiperSlide>
            <img className='h-[486px] w-[728px] rounded-2xl' src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='h-[486px] w-[728px] rounded-2xl' src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='h-[486px] w-[728px] rounded-2xl' src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='h-[486px] w-[728px] rounded-2xl' src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='h-[486px] w-[728px] rounded-2xl' src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='h-[486px] w-[728px] rounded-2xl' src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperSlide>

        </Swiper>
      </div>
      <div className='flex flex-col col-span-2 row-span-2 gap-8 '>
        <div className=''>
          <p className='text-3xl text-'>Chi-chi</p>
          <div className="rating rating-lg rating-half">
            <input type="radio" name="rating-avg" className="bg-yellow-500 mask mask-star-2 mask-half-1" checked disabled />
            <input type="radio" name="rating-avg" className="bg-yellow-500 mask mask-star-2 mask-half-2" checked disabled />
            <input type="radio" name="rating-avg" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled />
            <input type="radio" name="rating-avg" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />
            <input type="radio" name="rating-avg" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled />
            <input type="radio" name="rating-avg" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />
            <input type="radio" name="rating-avg" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled />
            <input type="radio" name="rating-avg" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />
            <input type="radio" name="rating-avg" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled />
            <input type="radio" name="rating-avg" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />

          </div>
          <p className='mt-3'>machhindra marg , Nepal</p>
          <p className='mt-3 w-full bg-slate-100 rounded-lg p-3 h-40'>Welcome to CHi-CHi! Nestled in a cozy corner, CHi-CHi offers a tantalizing selection of grilled chicken and pork as well as fish dishes that will delight your senses and satisfy your cravings.</p>
          <div className='mt-2 flex items-center justify-start gap-3 h-14'>
            <button className='btn btn-primary w-80' onClick={()=>setShowModal(true)}>add review</button>
            <div className=''>
                <svg className="h-12 w-12 text-gray-800 dark:text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={isFavourite?"currentColor":"none"}viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                </svg>
          
            </div>

          </div>
        </div>
        <div>
          <Tabs>
            <Tab label="Map">
              <div className="App">

                <iframe
                  className='rounded-2xl'
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7273.904211293504!2d85.307945566468!3d27.67357411547265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb192d79c4bca5%3A0xa7f535ecc88e78d8!2sCHi-CHi!5e0!3m2!1sen!2snp!4v1717407139008!5m2!1sen!2snp"
                  width={MapStyle.width}
                  height={MapStyle.height}
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
                  <div className='flex items-center justify-between  border-[0.5px] border-neutral-300 p-1 my-2 rounded-lg'>
                    <span className='text-2xl'>Momo</span>
                    <span className='text-xl text-right'>150</span>
                  </div>
                  <div className='flex items-center justify-between  border-[0.5px] border-neutral-300 p-1 my-2 rounded-lg'>
                    <span className='text-2xl'>Momo</span>
                    <span className='text-xl text-right'>150</span>
                  </div>
                  <div className='flex items-center justify-between  border-[0.5px] border-neutral-300 p-1 my-2 rounded-lg'>
                    <span className='text-2xl'>Momo</span>
                    <span className='text-xl text-right'>150</span>
                  </div>
                  <div className='flex items-center justify-between  border-[0.5px] border-neutral-300 p-1 my-2 rounded-lg'>
                    <span className='text-2xl'>Momo</span>
                    <span className='text-xl text-right'>150</span>
                  </div>
                  <div className='flex items-center justify-between  border-[0.5px] border-neutral-300 p-1 my-2 rounded-lg'>
                    <span className='text-2xl'>Momo</span>
                    <span className='text-xl text-right'>150</span>
                  </div>
                  <div className='flex items-center justify-between  border-[0.5px] border-neutral-300 p-1 my-2 rounded-lg'>
                    <span className='text-2xl'>Momo</span>
                    <span className='text-xl text-right'>150</span>
                  </div>
                  <div className='flex items-center justify-between  border-[0.5px] border-neutral-300 p-1 my-2 rounded-lg'>
                    <span className='text-2xl'>Momo</span>
                    <span className='text-xl text-right'>150</span>
                  </div>
                  <div className='flex items-center justify-between  border-[0.5px] border-neutral-300 p-1 my-2 rounded-lg'>
                    <span className='text-2xl'>Momo</span>
                    <span className='text-xl text-right'>150</span>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <div className='col-span-3 row-span-3 h-full w-full p-2'>
        <p className='text-3xl'>Reviews</p>
        <div className='tags my-2 flex flex-wrap gap-2 '>
          <span className="badge w-20 p-2">Badge</span>
          <span className="badge w-20 p-2">Badge</span>
          <span className="badge w-20 p-2">Badge</span>
          <span className="badge w-20 p-2">Badge</span>
          <span className="badge w-20 p-2">Badge</span>
          <span className="badge w-20 p-2">Badge</span>
        </div>
        <div className='reviews overflow-auto flex flex-col gap-3 h-80 mt-5 rounded-lg'>
          <div className="user-rating bg-default-50 flex flex-col gap-3 rounded-md border-[0.5px] border-neutral-300 p-3 text-base justify-start">
            <div className="user-details flex gap-3 items-center">
              <img className=" rounded-full w-6 h-6" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              <p className='text-xl'>Vision Rijal</p>
              <div className="rating rating-sm rating-half">
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled checked />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled checked />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled checked />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />

              </div>
            </div>
            <div className='review-text '>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eos doloribus quisquam fuga aut! Ullam tempora, temporibus modi fuga minus sint eligendi, tenetur molestias esse totam pariatur facere obcaecati consectetur.</p>
            </div>
          </div>
          <div className="user-rating bg-default-50 flex flex-col gap-3 rounded-md border-[0.5px] border-neutral-300 p-3 text-base justify-start">
            <div className="user-details flex gap-3 items-center">
              <img className=" rounded-full w-6 h-6" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              <p className='text-xl'>Vision Rijal</p>
              <div className="rating rating-sm rating-half">
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled checked />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled checked />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled checked />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled />
                <input type="radio" name="rating-1" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />

              </div>
            </div>
            <div className='review-text '>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eos doloribus quisquam fuga aut! Ullam tempora, temporibus modi fuga minus sint eligendi, tenetur molestias esse totam pariatur facere obcaecati consectetur.</p>
            </div>
          </div>
          <div className="user-rating bg-default-50 flex flex-col gap-3 rounded-md border-[0.5px] border-neutral-300 p-3 text-base justify-start">
            <div className="user-details flex gap-3 items-center">
              <img className=" rounded-full w-6 h-6" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              <p className='text-xl'>Vision Rijal</p>
              <div className="rating rating-sm rating-half">
                <input type="radio" name="rating-2" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled checked />
                <input type="radio" name="rating-2" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled checked />
                <input type="radio" name="rating-2" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled checked />
                <input type="radio" name="rating-2" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />
                <input type="radio" name="rating-2" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled />
                <input type="radio" name="rating-2" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />
                <input type="radio" name="rating-2" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled />
                <input type="radio" name="rating-2" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />
                <input type="radio" name="rating-2" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled />
                <input type="radio" name="rating-2" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />

              </div>
            </div>
            <div className='review-text '>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eos doloribus quisquam fuga aut! Ullam tempora, temporibus modi fuga minus sint eligendi, tenetur molestias esse totam pariatur facere obcaecati consectetur.</p>
            </div>
          </div>
          <div className="user-rating bg-default-50 flex flex-col gap-3 rounded-md border-[0.5px] border-neutral-300 p-3 text-base justify-start">
            <div className="user-details flex gap-3 items-center">
              <img className=" rounded-full w-6 h-6" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              <p className='text-xl'>Vision Rijal</p>
              <div className="rating rating-sm rating-half">
                <input type="radio" name="rating-3" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled checked />
                <input type="radio" name="rating-3" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled checked />
                <input type="radio" name="rating-3" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled checked />
                <input type="radio" name="rating-3" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled checked />
                <input type="radio" name="rating-3" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled />
                <input type="radio" name="rating-3" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />
                <input type="radio" name="rating-3" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled />
                <input type="radio" name="rating-3" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />
                <input type="radio" name="rating-3" className="bg-yellow-500 mask mask-star-2 mask-half-1" disabled />
                <input type="radio" name="rating-3" className="bg-yellow-500 mask mask-star-2 mask-half-2" disabled />

              </div>
            </div>
            <div className='review-text '>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eos doloribus quisquam fuga aut! Ullam tempora, temporibus modi fuga minus sint eligendi, tenetur molestias esse totam pariatur facere obcaecati consectetur.</p>
            </div>
          </div>
        </div>
      </div>
          <Modal title="add review" text="add a review" visible={showModal} onClose={()=>{setShowModal(false)}}/>
    </section>
  )
}

export default RestaurantProfile    