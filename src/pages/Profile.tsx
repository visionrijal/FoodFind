import React, { useEffect, useState } from 'react';
import { getUserReviews, getFavoriteRestaurants, getUserRequestedRestaurants } from '../utility/api';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const UserProfile = () => {
    const [user, setUser] = useState<{ username: string; profile_picture: string; id: number; email: string; joined: string } | null>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [favoriteRestaurants, setFavoriteRestaurants] = useState<any[]>([]);
    const [requestedRestaurants, setRequestedRestaurants] = useState<any[]>([]);

    useEffect(() => {
        // Fetch user data from localStorage or API
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userObj = JSON.parse(storedUser);
            setUser(userObj);

            // Fetch user reviews
            getUserReviews(userObj.id)
                .then(data => setReviews(data))
                .catch(error => console.error('Error fetching user reviews:', error));

            // Fetch favorite restaurants
            getFavoriteRestaurants(userObj.id)
                .then(data => setFavoriteRestaurants(data))
                .catch(error => console.error('Error fetching favorite restaurants:', error));

            // Fetch requested restaurants
            getUserRequestedRestaurants(userObj.id)
                .then(data => setRequestedRestaurants(data))
                .catch(error => console.error('Error fetching requested restaurants:', error));
        }
    }, []);

    if (!user) {
        return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            {/* Profile Section */}
            <div className="mb-8 bg-white shadow-lg rounded-lg p-6 flex items-center">
                <img
                    src={user.profile_picture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-indigo-500 mr-6"
                />
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Welcome, {user.username.split(' ')[0]}</h1>
                    <h2 className="text-xl font-semibold text-gray-700">{user.username}</h2>
                    <p className="text-gray-600">Email: {user.email}</p>
                    <p className="text-gray-600">Joined: {new Date(user.joined).toLocaleString()}</p>
                </div>
            </div>

            {/* Favorite Restaurants */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Your Favorite Restaurants</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {favoriteRestaurants.map((restaurant) => (
                        <div key={restaurant.id} className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                            <div className="flex items-center mb-4">

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{restaurant.name}</h3>
                                    <p className="text-gray-600">Location: {restaurant.location}</p>
                                </div>
                            </div>
                            <Link to={`/restaurant/${restaurant.id}`}>
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors">
                                    View
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Your Reviews</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {reviews.map(review => (
                        <div key={review.id} className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{review.restaurant_name}</h3>
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-500">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar key={index} className={index < review.rating ? 'inline' : 'inline text-gray-300'} />
                                    ))}
                                </span>
                                <p className="ml-2 text-gray-600">({review.rating})</p>
                            </div>
                            <p className="text-gray-600 mb-2">Review: {review.review_text}</p>
                            <p className="text-gray-500">Created At: {new Date(review.created_at).toLocaleString()}</p>
                            <Link to={`/restaurant/${review.restaurant_id}`}>
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors">
                                    View
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Requested Restaurants */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Requested Restaurants</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {requestedRestaurants.map((restaurant) => (
                        <div key={restaurant.id} className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{restaurant.name}</h3>
                            <p className="text-gray-600 mb-1">Location: {restaurant.location}</p>
                            <p className="text-gray-600">Description: {restaurant.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
