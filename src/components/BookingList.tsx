"use client"
import { useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "../redux/store"
import { removeBooking } from "../redux/features/cartSlice"
import createBooking from "@/libs/createBooking";
import { useSession } from "next-auth/react";
import { BookingItem } from "../../interface";

export default function BookingList() {
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useAppSelector((state) => state.cartSlice.carItems)
    const { data: session } = useSession()

    const handlePostRequest = async (bookingItem:BookingItem) => {
       
         if(session && session.user.token) {
        // console.log(session)
        try {
            console.log(bookingItem.carId)
            console.log(session.user._id)
            console.log(bookingItem)
            console.log(session.user.token)
            const response = await createBooking(bookingItem.carId, session.user._id, bookingItem, session.user.token,bookingItem.carModel)
            if (response.success) {
                dispatch(removeBooking(bookingItem))
            }
            // alert(response.success)
        } catch (error) {
            console.log("Failed to send data")
          }
        }
    }

    return (
        <>
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 text-lg mt-5">
                    No Car Booking
                </div>
            ) : (
                <div className="pt-2">{
                cartItems.map((bookingItem: BookingItem) => (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 flex justify-between items-center">
                        <div>
                            <div>Model: {bookingItem.carModel}</div>
                            <div className="text-md">Number Of Days: {bookingItem.numOfDays}</div>
                            <div className="text-md">Pickup Location: {bookingItem.returnLocation}</div>
                            <div className="text-md">Pickup Date: {bookingItem.pickupDate}</div>
                            <div className="text-md">Return Location: {bookingItem.returnLocation}</div>
                            <div className="text-md">Return Date: {bookingItem.returnDate}</div>
                        </div>
                        <div>
                        <button
                            onClick={() => handlePostRequest(bookingItem)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-emerald-700 transition mx-1" >
                            confirm
                        </button>
                        <button
                            onClick={() => dispatch(removeBooking(bookingItem))}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition mx-1">
                            Remove
                        </button>
                        </div>
                    </div>
                ))
                }</div>
            )}
        </>
    )
}
