// src/api.ts
import axios from 'axios';

export const getRestaurantDetails = async (id) => {
    console.log("id " + id)
    const response = await axios.get(
        `http://127.0.0.1:8000/api/restaurants/${id}`
        // import.meta.env.VITE_GET_TOP_PICKS
    );
    return response.data;
};

export const getRestaurantList = async (selectedTags) => {
    if(selectedTags){
        // const tagsQuery = selectedTags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&');
        const url = `http://127.0.0.1:8000/api/restaurants/`;
        const response = await axios.get(url,{
            params: { recommend: 'true', user_id: JSON.parse(localStorage.getItem("user")).id},
          });
        console.log(url);
        
        return response.data
    }
    const response = await axios.get(
        "http://127.0.0.1:8000/api/restaurants/"
    );
    return response.data;
};

export const getAllTags = async () => {
    const response = await axios.get(
        "http://127.0.0.1:8000/api/tags/"
    )
    return response.data;
}
export const addReview = async (obj) => {
    const response = await axios.post(
        "http://127.0.0.1:8000/api/create-review/",obj
    )
    return response.data;
}

export const getUserReviews = async (userId: number) => {
    // console.log(`Fetching user reviews for ${userId}`);
    const response = await axios.get(`http://127.0.0.1:8000/api/user-reviews/${userId}`);
    // console.log(response.data);
    return response.data; // Assuming this returns an array of reviews
};


export const markAsFavorite = async (restaurantId: string, userId: string, addToFavorites: boolean) => {
    const url = addToFavorites
        ? 'http://127.0.0.1:8000/api/add-to-favorites/'
        : 'http://127.0.0.1:8000/api/remove-from-favorites/';

    try {
        const response = await axios.post(url, {
            user_id: userId,
            restaurant_id: restaurantId
        });
        // console.log('Response from markAsFavorite:', response);
        return response.data;
    } catch (error) {
        console.error('Error marking favorite:', error); // Log error details
        throw new Error(`Error marking favorite: ${error.message}`);
    }
};

export const getFavoriteRestaurants = async (userId: number) => {
    try {
        // console.log(`Fetching favorite restaurants for user ${userId}`);
        const response = await axios.get(`http://127.0.0.1:8000/api/favorite-restaurants/${userId}/`);
        // console.log('Favorite Restaurants Data:', response.data); // Print the data
       response.data.forEach((data)=>{
        localStorage.setItem(`restaurant_${data.id}_favorite`,"true");
       })
        return response.data;
        
    } catch (error) {
        console.error('Error fetching favorite restaurants:', error);
        throw new Error(`Error fetching favorite restaurants: ${error.message}`);
    }
};




// const API_URL = 'http://127.0.0.1:8000/api/user-requests/';

// export const submitRestaurant = async (formData) => {
//     try {
//         const response = await axios.post(API_URL, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error submitting restaurant data:', error);
//         throw error;
//     }
// };