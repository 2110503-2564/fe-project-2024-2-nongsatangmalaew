import { Dayjs } from "dayjs"

export default async function updateBooking(id: string, 
    pickupDate: string,
    returnDate: string,
    pickupLocation: string,
    returnLocation: string,
     token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            pickupDate: pickupDate,
            returnDate: returnDate,
            pickupLocation: pickupLocation,
            returnLocation: returnLocation,
        }),
    })
    if (!response.ok) {
        throw new Error("Failed to fetch rental")
    }
    return await response.json()
}