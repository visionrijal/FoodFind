import { useEffect, useRef, useState } from "react";
import { addReview } from "../utility/api";

export function Modal({ title, text, visible, onClose, id, userId,restaurantId }) {
    const modalRef = useRef(null);
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState(null);

    useEffect(() => {
        if (!modalRef.current) {
            return;
        }
        visible ? modalRef.current.showModal() : modalRef.current.close();
        // Reset rating when modal is opened for a new restaurant
        if (visible) {
            setRating(5);
        }
    }, [visible, id,]);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    }

    const handleESC = (event) => {
        event.preventDefault();
        handleClose();
    }

    const handleRatingChange = (value) => {
        setRating(value);
    }
    const handleReviewChange = (e) => {
        setReview(e.target.value)
    }
    const  handleAdd = async ()=>{
        await addReview({
            user:userId,
            review_text:review,
            restaurant:restaurantId,
            rating
        })
        onClose();

    }
    
    return (
        <dialog ref={modalRef} id="my_modal_1" className="modal relative" onCancel={handleESC}>
            <form method="dialog" className="modal-box flex flex-col gap-5 w-96">
                <div className="modal-action absolute top-[-15px] right-3">
                    {/* if there is a button in form, it will close the modal */}
                    <button type="button" className="bg-primary w-4 h-4 rounded-full text-xs" onClick={handleClose}>X</button>
                </div>
                <h3 className="font-bold text-lg">Add Your Review!</h3>
                <div className="rating rating-md">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <input
                            key={value}
                            type="radio"
                            name={`${id}review`}
                            className="mask mask-heart bg-yellow-400"
                            checked={rating === value}
                            onChange={() => handleRatingChange(value)}
                        />
                    ))}
                </div>
                <div className="w-full pl-4 pr-1 py-1 flex items-center justify-between border-[0.5px] border-neutral-300 rounded-full">
                    <input type="text" className="appearance-none outline-none" placeholder="Add Your Review" onChange={(e) => handleReviewChange(e)} />
                    <button className="bg-primary h-10 w-10 rounded-full text-sm" onClick={handleAdd}>ADD</button>
                </div>
            </form>
        </dialog>
    );
}
