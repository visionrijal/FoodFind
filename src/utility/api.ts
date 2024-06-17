// src/api.js
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
        const tagsQuery = selectedTags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&');
        const url = `http://127.0.0.1:8000/api/restaurants/?${tagsQuery}`;
        const response = await axios.get(url);
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
