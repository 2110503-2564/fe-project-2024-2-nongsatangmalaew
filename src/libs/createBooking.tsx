import { BookingItem } from "../../interface"

export default async function createBooking(cid: string, uid: string, bookingItem: BookingItem, token: string,carModel1:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars/${cid}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            pickupDate: bookingItem.pickupDate,
            returnDate: bookingItem.returnDate,
            pickupLocation: bookingItem.pickupLocation,
            returnLocation: bookingItem.returnLocation,
            user: uid,
            car: cid,
            carModel:carModel1,
        }),
        mode: 'cors',
    })
    if (!response.ok) {
        if (response.status === 400) alert(response.status + " you have already rent 3 cars")
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
}