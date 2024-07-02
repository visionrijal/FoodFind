// UserProfile.tsx

import React, { useEffect, useState } from 'react';
import { getUserReviews, getRestaurantDetails } from '../utility/api';
import { Link } from 'react-router-dom';
// api is in ../utility/api

const UserProfile = () => {
    const [user, setUser] = useState<{ username: string; profile_picture: string } | null>(null);
    const [reviews, setReviews] = useState<any[]>([]); // Assuming your review structure

    useEffect(() => {
        // Fetch user data from localStorage or API
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Fetch user reviews
        if (storedUser) {
            const userObj = JSON.parse(storedUser);
            getUserReviews(userObj.id) // Assuming userObj has id
                .then(data => setReviews(data))
                .catch(error => console.error('Error fetching user reviews:', error));
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold mt-8 mb-7">User Profile</h1>
                <div className="flex items-center mb-4">
                    <img
                        src={user.profile_picture}
                        alt="Profile"
                        className="rounded-full w-20 h-20 mr-4 "
                    />
                    <div>
                        <h2 className="text-xl font-bold">{user.username}</h2>
                        <p>Email : {user.email}</p>
                        <p>Logged in at : {new Date(user.joined).toLocaleString()}</p>
                    </div>
                </div>
                <hr className="mb-12" />
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Favorite Restaurants</h2>
                <hr className="mb-4" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="shadow-md p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                        <h3 className="text-xl font-bold">Restaurant 1</h3>
                        <p>Location: City, Country</p>
                        <p>Rating: 4.5</p>
                    </div>
                    <div className="shadow-md p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                        <h3 className="text-xl font-bold">Restaurant 2</h3>
                        <p>Location: City, Country</p>
                        <p>Rating: 4.2</p>
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                <hr className="mb-4" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {reviews.map(review => (
                        <div key={review.id} className="shadow-md p-4 rounded-lg mb-4 transition duration-300 ease-in-out transform hover:scale-105">
                            <h3 className="text-lg font-bold ">{review.restaurant_name}</h3>
                            <p>Provided Rating : {review.rating}</p>
                            <p>Review Text : {review.review_text}</p>
                            <p>Created At : {new Date(review.created_at).toLocaleString()}</p>
                            {review.restaurant_id ? (
                                <Link to={`/restaurant/${review.restaurant_id}`}>
                                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
                                        View
                                    </button>
                                </Link>
                            ) : (
                                <p>No restaurant ID available</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
