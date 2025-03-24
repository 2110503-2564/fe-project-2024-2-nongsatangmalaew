"use client"

import DateReserve from "@/components/DateReserve";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ReservationItem } from "../../../interface";
import dayjs, { Dayjs } from "dayjs";
import { addReservation } from "@/redux/features/cartSlice";
import { useSearchParams } from "next/navigation";
import CarCatalog from "@/components/CarCatalog";
import Car from "../(carinfo)/car/page";
import Card from "@/components/Card";
import { userAgent } from "next/server";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { Select, MenuItem } from "@mui/material";
import ProviderReserve from "@/components/ProviderReserve";

export default function Booking() {


    const urlParams = useSearchParams()
    const cid =urlParams.get('id')
    const model = urlParams.get('model')
    const user = urlParams.get('user')
    const dispatch = useDispatch<AppDispatch>()

    const [pickupDate, setPickupDate] = useState<Dayjs|null>(null)
    const [pickupLocation, setPickupLocation] = useState<string>("Bangkok")
    const [returnDate, setReturnDate] = useState<Dayjs|null>(null)
    const [returnLocation, setReturnLocation] = useState<string>("Bangkok")
    const [pickupProvider,setProvider] = useState<string>("Tahto Naju")

    const makeReservation=()=>{
        if(cid && model && pickupDate && returnDate){
            const item:ReservationItem={
                carId:cid,
                carModel:model,
                numOfDays: returnDate.diff(pickupDate,'day'),
                pickupDate: dayjs(pickupDate).format("YYYY/MM/DD"),
                pickupLocation: pickupLocation,
                returnDate: dayjs(returnDate).format("YYYY/MM/DD"),
                returnLocation: returnLocation,
                pickupProvider: pickupProvider
            }
            dispatch(addReservation(item));
        }
    }
    return(
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">New Reservation</div>
            <div className="text-xl font-medium">Car {model}</div>
            <div className="text-md text-left text-gray-600">Choose the provider, date, and car you want to reserve.</div>
            <div><h2>Provider</h2></div>
            <div>
                <ProviderReserve onProviderChange={(value:string) => {setProvider(value)}}/>
            </div>
            <div><h2>Departure Date and Location</h2></div>
            <div>
                 <DateReserve onDateChange={(value:Dayjs) => {setPickupDate(value)}} onLocationChange={(value:string) => {setPickupLocation(value)}}/>
             </div>
             <div><h2>Arrival Date and Location</h2></div>
            <div>
                 <DateReserve onDateChange={(value:Dayjs) => {setReturnDate(value)}} onLocationChange={(value:string) => {setReturnLocation(value)}}/>
             </div>

            <button name="Book Car" className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
            onClick={makeReservation}>
               Reserve this car 
            </button>
        </main>
    )

}