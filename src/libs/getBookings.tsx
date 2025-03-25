import { BookingJson } from "../../interface"

export default async function getBookings(token: string): Promise<BookingJson> {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch Bookings")
    }
    return await response.json() as BookingJson
}