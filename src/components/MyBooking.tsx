"use client"
import deleteBooking from "@/libs/deleteBooking";
import getBookings from "@/libs/getBookings";
import getUserProfile from "@/libs/getUserProfile";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BookingItem, BookingJson, UserJson } from "../../interface";

export default function MyBooking() {

    const { data: session } = useSession()

    const [bookingsJson, setBookingJson] = useState<BookingJson | null>(null);
    const [userJson, setUserJson] = useState<UserJson | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const response = session ? await getBookings(session.user.token) : null
        const profile = session ? await getUserProfile(session.user.token) : null
        setUserJson(profile);
        setBookingJson(response);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteRequest = async (bookingItem: BookingItem) => {
        if (session && session.user.token && bookingItem._id)
            try {
                const response = await deleteBooking(bookingItem._id, session.user.token)
                if (response.success) fetchData()
            } catch (error) {
                alert("fail")
                console.log("Failed to delete data")
            }
    }

    return (
        <div className="p-5">{loading ? <p>Loading...</p> : bookingsJson ?
            bookingsJson.data.map((bookingItem: BookingItem) => (
                <div className="flex gap-4 m-2">
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 flex justify-between items-center w-full">
                        <div>
                            {userJson?.data.role === "admin" ? <div>User Id: {bookingItem.user}</div> : null}
                            <div>Model: {bookingItem.carModel}</div>
                            <div className="text-md">Number Of Days: {dayjs(bookingItem.returnDate).diff(dayjs(bookingItem.pickupDate), "day")}</div>
                            <div className="text-md">Pickup Location: {bookingItem.returnLocation}</div>
                            <div className="text-md">Pickup Date: {bookingItem.pickupDate}</div>
                            <div className="text-md">Return Location: {bookingItem.returnLocation}</div>
                            <div className="text-md">Return Date: {bookingItem.returnDate}</div>
                        </div>
                        <div>
                            <Link href={`/booking/manage?id=${bookingItem._id}`}>
                                <button
                                    className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-indigo-700 transition mx-1">
                                    edit
                                </button>
                            </Link>
                            <button
                                onClick={() => handleDeleteRequest(bookingItem)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition mx-1">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )) :
            <div> There is no booking</div>
        }</div>
    )
}