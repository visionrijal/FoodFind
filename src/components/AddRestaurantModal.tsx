import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface FormData {
    name: string;
    location: string;
    description: string;
    openingHours: string;
    price: string;
    menu: FileList;
}

const AddRestaurantModal = ({ closeModal }: { closeModal: () => void }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [notification, setNotification] = useState<string | null>(null);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('location', data.location);
        formData.append('description', data.description);
        formData.append('opening_hours', data.openingHours);
        formData.append('price', data.price);
        formData.append('user_id', user.id);  
        if (data.menu.length > 0) {
            formData.append('menu', data.menu[0]);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/add-restaurant/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // console.log('Restaurant added successfully', response.data);
            setNotification('Restaurant added successfully!');
            reset();
            setTimeout(() => {
                setNotification(null); // Hide the notification after 1 second
                closeModal();
            }, 1000);
        } catch (error) {
            console.error('Error adding restaurant:', error);
            setNotification('An error occurred while adding the restaurant. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
            <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
            <div className="relative bg-white text-black rounded-lg p-6 max-w-md max-h-[90vh] overflow-y-auto">
                <button onClick={closeModal} className="absolute top-3 right-5 text-gray-600 hover:text-gray-900" aria-label="Close">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
                <h2 className="text-2xl mb-4">Request to Add a Restaurant</h2>
                <form onSubmit={handleSubmit(onSubmit)} method="post" encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="input input-bordered w-full"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Location</label>
                        <input
                            type="text"
                            {...register('location', { required: 'Location is required' })}
                            className="input input-bordered w-full"
                        />
                        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Description</label>
                        <textarea
                            {...register('description', { required: 'Description is required' })}
                            className="textarea textarea-bordered w-full"
                        ></textarea>
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Opening Hours</label>
                        <input
                            type="text"
                            {...register('openingHours', { required: 'Opening hours are required' })}
                            className="input input-bordered w-full"
                        />
                        {errors.openingHours && <p className="text-red-500">{errors.openingHours.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Price</label>
                        <input
                            type="text"
                            {...register('price', { required: 'Price is required' })}
                            className="input input-bordered w-full"
                        />
                        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Menu Image</label>
                        <input
                            type="file"
                            {...register('menu')}
                            className="file-input file-input-bordered w-full"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={closeModal} className="btn bg-bumblebee border-none hover:bg-yellow-500 btn-secondary mr-2">Cancel</button>
                        <button type="submit" className="btn btn-primary bg-bumblebee border-none hover:bg-yellow-500">Submit</button>
                    </div>
                </form>
                {notification && (
                    <div className="absolute top-2 right-2 p-4 bg-green-500 text-white rounded-lg shadow-lg">
                        {notification}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddRestaurantModal;
