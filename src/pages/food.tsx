// Import Swiper React components
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Tabs, Tab } from '../components/Tabs';
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
}

const topCategories = [
  { id: 1, name: 'Italian' },
  { id: 2, name: 'Mexican' },
  { id: 3, name: 'Nepalese' },
];

const foodItems: FoodItem[] = [
  {
    id: 1,
    name: 'Pizza Margherita',
    description: 'Fresh tomatoes, mozzarella, and basil',
    price: 12.99,
    images: ['pizza-margherita.jpg', 'pizza-margherita-2.jpg'],
  },
  {
    id: 2,
    name: 'Chicken Fajitas',
    description: 'Sizzling chicken, bell peppers, and onions',
    price: 15.99,
    images: ['chicken-fajitas.jpg', 'chicken-fajitas-2.jpg'],
  },
];

const FoodPage = () => {
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);

  const handleFoodCardClick = (foodItem: FoodItem) => {
    setSelectedFoodItem(foodItem);
  };

  return (
    <div className="container mx-auto p-4">
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
      >
        {topCategories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-lg font-bold">{category.name}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {foodItems.map((foodItem) => (
          <div
            key={foodItem.id}
            className="bg-white p-4 rounded shadow-md cursor-pointer"
            onClick={() => handleFoodCardClick(foodItem)}
          >
            <h2 className="text-lg font-bold">{foodItem.name}</h2>
            <p className="text-gray-600">{foodItem.description}</p>
            <p className="text-lg font-bold">${foodItem.price}</p>
          </div>
        ))}
      </div>

      {/* Detailed Food Item Modal */}
      {selectedFoodItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center">
          <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold">{selectedFoodItem.name}</h2>
            <p className="text-gray-600">{selectedFoodItem.description}</p>
            <p className="text-lg font-bold">${selectedFoodItem.price}</p>
            <div className="flex flex-wrap">
              {selectedFoodItem.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={selectedFoodItem.name}
                  className="w-full md:w-1/2 p-2"
                />
              ))}
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setSelectedFoodItem(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodPage;