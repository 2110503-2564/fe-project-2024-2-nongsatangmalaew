"use client";
import { useEffect, useState } from "react";
import { removeReservation, editReservation } from "@/redux/features/cartSlice";
import { useRouter } from "next/navigation"; // Import useRouter
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

export default function ReservationCart() {
  const router = useRouter(); // Initialize the router
  const carItems = useAppSelector((state) => state.cartSlice.carItems);
  const dispatch = useDispatch<AppDispatch>();

  // Track whether the component has mounted (hydrated)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <p>Loading...</p>; // Prevents mismatch between SSR and client
  }

  return (
    <>
      {carItems.map((reservationItem) => (
        <div
          className="bg-slate-200 rounded px-5 mx-5 py-2 my-2"
          key={reservationItem.carId}
        >
          <div className="text-xl">{reservationItem.carModel}</div>
          <div className="text-sm">
            Pick-up {reservationItem.pickupDate} from {reservationItem.pickupLocation}
          </div>
          <div className="text-sm">
            Return {reservationItem.returnDate} to {reservationItem.returnLocation}
            <div className="text-md">Duration: {reservationItem.numOfDays}</div>
          </div>
          <button
            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm"
            onClick={() => {
              dispatch(
                editReservation({
                  oldItem: reservationItem,
                  newItem: { ...reservationItem }, // Ensure valid object
                })
              );
              const queryParams = new URLSearchParams({
                cid: reservationItem.carId,
                model: reservationItem.carModel,
              }).toString();
              router.push(`/booking/edit?${queryParams}`); // Redirect to /booking/edit
            }}
          >
            Edit Booking Detail
          </button>
          <br />
          <button
            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm"
            onClick={() => dispatch(removeReservation(reservationItem))}
          >
            Remove from Cart
          </button>
        </div>
      ))}
    </>
  );
}
