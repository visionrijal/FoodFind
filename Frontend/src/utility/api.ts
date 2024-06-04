// src/api.js
import axios from 'axios';


export const getTopPicks = async () => {
    const response = await axios.get(
       "https://6658996a5c36170526492754.mockapi.io/api/restaurants"
        // import.meta.env.VITE_GET_TOP_PICKS
    );
    return response.data;
};

export const getExploreRestaurants = async () => {
    const response = await axios.get(
        "https://6658996a5c36170526492754.mockapi.io/api/restaurants"
        // import.meta.env.VITE_GET_EXPLORE_RESTAURANTS
    );
    return response.data;
};
