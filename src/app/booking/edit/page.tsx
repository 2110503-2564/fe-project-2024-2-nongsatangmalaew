"use client"

import DateReserve from "@/components/DateReserve";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "../../../../interface";
import dayjs, { Dayjs } from "dayjs";
import { editBooking as editBookingAction } from "@/redux/features/cartSlice"; // Renamed import
import { useSearchParams } from "next/navigation";
import ProviderReserve from "@/components/ProviderReserve";

export default function Booking() {
    const urlParams = useSearchParams();
    const cid = urlParams.get('cid');
    const model = urlParams.get('model');
    const dispatch = useDispatch<AppDispatch>();

    const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
    const [pickupLocation, setPickupLocation] = useState<string>("Bangkok");
    const [pickupProvider, setProvider] = useState<string>("Tahto Naju");
    const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
    const [returnLocation, setReturnLocation] = useState<string>("Bangkok");

    // ✅ Rename function to avoid conflict
    const handleEditBooking = () => {
        console.log("cid:", cid);
        console.log("model:", model);
        console.log("pickupDate:", pickupDate);
        console.log("returnDate:", returnDate);
    
        if (!cid || !model || !dayjs(pickupDate).isValid() || !dayjs(returnDate).isValid()) {
            alert("Please select valid dates before editing the reservation.");
            return;
        }
    
        const formattedPickupDate = dayjs(pickupDate).format("YYYY/MM/DD");
        const formattedReturnDate = dayjs(returnDate).format("YYYY/MM/DD");
        const duration = dayjs(returnDate).diff(dayjs(pickupDate), 'day');
    
        const oldItem: BookingItem = {
            carId: cid,
            carModel: model,
            numOfDays: duration,
            pickupDate: formattedPickupDate,
            pickupLocation,
            returnDate: formattedReturnDate,
            returnLocation,
        };
    
        const newItem: Partial<BookingItem> = {
            pickupDate: formattedPickupDate,
            returnDate: formattedReturnDate,
            pickupLocation,
            returnLocation
        };
    
        dispatch(editBookingAction({ oldItem, newItem }));
    
        alert("Booking updated successfully!"); // Feedback
    };
    

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">Edit Booking</div>
            <div className="text-xl font-medium">Car {model}</div>

            <div className="text-md text-left text-gray-600">Edit the date and car that you reserved.</div>
                        <div><h2>Departure Date and Location</h2></div>
                        <div>
                             <DateReserve onDateChange={(value:Dayjs) => {setPickupDate(value)}} onLocationChange={(value:string) => {setPickupLocation(value)}}/>
                         </div>
                         <div><h2>Arrival Date and Location</h2></div>
                        <div>
                             <DateReserve onDateChange={(value:Dayjs) => {setReturnDate(value)}} onLocationChange={(value:string) => {setReturnLocation(value)}}/>
                         </div>

            <button
                name="Book Car"
                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                onClick={handleEditBooking} // ✅ Use the fixed function
            >
                Edit reservation of this car
            </button>
        </main>
    );
}
