import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface FormData {
    name: string;
    location: string;
    description: string;
    openingHours: string;
    price: string;
}

const AddRestaurantModal = ({ closeModal }: { closeModal: () => void }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [notification, setNotification] = useState<string | null>(null);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('location', data.location);
        formData.append('description', data.description);
        formData.append('opening_hours', data.openingHours);
        formData.append('price', data.price);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/add-restaurant/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Restaurant added successfully', response.data);
            setNotification('Restaurant added successfully!');
            reset();
            setTimeout(() => {
                setNotification(null); // Hide the notification after 2 seconds
                closeModal();
            }, 2000);
        } catch (error) {
            console.error('Error adding restaurant:', error);
            setNotification('An error occurred while adding the restaurant. Please try again.');
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 relative">
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
                    <div className="flex justify-end">
                        <button type="button" onClick={closeModal} className="btn btn-secondary mr-2">Cancel</button>
                        <button type="submit" className="btn btn-primary">Submit</button>
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

   