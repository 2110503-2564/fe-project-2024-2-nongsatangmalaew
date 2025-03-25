import getBookings from "@/libs/getBookings"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/authOptions"
import MyBooking from "@/components/MyBooking"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"

export default async function MyBookingPage() {
    return (
        <main className="pt-2">
                <h1 className="text-3xl font-medium flex justify-center">Your Booking</h1>
                <MyBooking/>
        </main>
    )
}