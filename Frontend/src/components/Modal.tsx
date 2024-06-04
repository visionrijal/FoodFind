import { useEffect, useRef } from "react";

export function Modal({ title, text, visible, onClose }) {
    const modalRef = useRef(null);

    useEffect(() => {
        if (!modalRef.current) {
            return;
        }
        visible ? modalRef.current.showModal() : modalRef.current.close();
    }, [visible]);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    }

    const handleESC = (event) => {
        event.preventDefault();
        handleClose();
    }

    return (
        <dialog ref={modalRef} id="my_modal_1" className="modal relative" onCancel={handleESC}>
            <form method="dialog" className="modal-box flex flex-col gap-5 w-96">
                <div className="modal-action absolute top-[-15px] right-3">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="bg-primary w-4 h-4 rounded-full text-xs" onClick={handleClose}>X</button>
                </div>
                <h3 className="font-bold text-lg">Add Your Review!</h3>
                <div className="rating rating-md rating-half">
                    <input type="radio" name="user-rating-modal" className="bg-yellow-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" name="user-rating-modal" className="bg-yellow-500 mask mask-star-2 mask-half-2" />
                    <input type="radio" name="user-rating-modal" className="bg-yellow-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" name="user-rating-modal" className="bg-yellow-500 mask mask-star-2 mask-half-2" />
                    <input type="radio" name="user-rating-modal" className="bg-yellow-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" name="user-rating-modal" className="bg-yellow-500 mask mask-star-2 mask-half-2" />
                    <input type="radio" name="user-rating-modal" className="bg-yellow-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" name="user-rating-modal" className="bg-yellow-500 mask mask-star-2 mask-half-2" />
                    <input type="radio" name="user-rating-modal" className="bg-yellow-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" name="user-rating-modal" className="bg-yellow-500 mask mask-star-2 mask-half-2" />
                </div>
                <div className="w-full pl-4 pr-2 py-1 flex  items-center justify-between border-[0.5px] border-neutral-300 rounded-full">
                    <input type="text" className="appearance-none outline-none" placeholder="Add Your Review" />
                    <button className="bg-primary h-10 w-10 rounded-full text-sm">ADD</button>
                </div>
            </form>
        </dialog>
    );
}