"use client"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import LocationDateReserve from "@/components/DateReserve";
//import ManagePanel from "@/components/ManagePanel";
import getBooking from "@/libs/getBooking";
import updateBooking from "@/libs/updateBooking";
import dayjs, { Dayjs } from "dayjs";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BookingJson1 } from "../../../../interface";

export default function ManageBooking({ searchParams }: { searchParams: { [id: string]: string | undefined } }) {
    
    // const session = await getServerSession(authOptions)
    const router = useRouter()
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false);
    const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
    const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
    const [pickupLocation, setPickupLocation] = useState<string>("BKK");
    const [returnLocation, setReturnLocation] = useState<string>("BKK");
    // const urlParams = useSearchParams();
    // const urlId = urlParams.get("id");
    const [bookingJson, setBookingJson] = useState<BookingJson1|null>(null);
    // let pickupDate, returnDate, pickupLocation, returnLocation;

    // if(!session || !searchParams["id"]) return

    const fetchData = async () => {
            setLoading(true);
    const response = session && searchParams["id"] ? await getBooking(searchParams["id"], session.user.token) : null
            // const response = session ? await getBookings(session.user.token) : null
            // const profile = session ? await getUserProfile(session.user.token) : null
            // setUserJson(profile);
            setBookingJson(response);
            // setPickupDate(response.data.pickupDate)
            // setReturnDate(response.data.returnDate)
            // setPickupLocation(response.data.pickupLocation)
            // setReturnLocation(response.data.returnLocation)
            setLoading(false);
        };
    
    useEffect(() => {
        fetchData();
    }, []);

    const handlePutRequest = async (
        pickupDate: Dayjs,
        returnDate: Dayjs,
        pickupLocation: string,
        returnLocation: string,) => {
            if(pickupDate < dayjs(new Date())){
                alert("You can not fill pickup date before this day")
                return
            }
            if(returnDate < pickupDate){
                alert("You can not fill return date before pickup date")
                return
            }
            if(session && session.user.token && searchParams["id"]){
                console.log(searchParams["id"])
                console.log(pickupDate)
                console.log(returnDate)
                console.log(pickupLocation)
                console.log(returnLocation)
                console.log(session.user.token)
            try {
                const response = await updateBooking(searchParams["id"], dayjs(pickupDate).format("YYYY/MM/DD"), dayjs(returnDate).format("YYYY/MM/DD"), pickupLocation, returnLocation, session.user.token)
                // alert(response.success)
                if (response.success) {
                    router.push('/mybooking') 
                }
            } catch (error) {
                console.log("Failed to update data")
              }
            }else alert("miss some value")
        }

    return (
        <main className="flex flex-col space-y-4 w-full">
            <div className="text-center text-lg ">
                Manage Your Booking</div>
                {loading ? <p>Loading...</p> : !bookingJson ? null:
            <div className="space-y-2 flex justify-around">
                        {/* <ManageInfo rid={params.rid} token={session.user.token}/> */}
                        
                        <div className="mx-3  place-self-center">
                            <div className="text-center text-lg font-bold">Old Booking</div>
                            <div>Model: {bookingJson.data.carModel}</div>
                            <div className="text-md">Number Of Days: {dayjs(bookingJson.data.returnDate).diff(dayjs(bookingJson.data.pickupDate), "day")}</div>
                            <div className="text-md">Pickup Location: {bookingJson.data.returnLocation}</div>
                            <div className="text-md">Pickup Date: {bookingJson.data.pickupDate}</div>
                            <div className="text-md">Return Location: {bookingJson.data.returnLocation}</div>
                            <div className="text-md">Return Date: {bookingJson.data.returnDate}</div>
                        </div>

                        <div className="justify-self-end">
                            {/* <ManagePanel pickupDateCB={(value:Dayjs)=> pickupDate=value}
                                returnDateCB={(value:Dayjs)=> returnDate=value}
                                pickuoLocationCB={(value:string)=> pickupLocation=value}
                                returnLocationCB={(value:string)=> returnLocation=value}/> */}
                            <div className="text-md text-left text-gray-600">Pick Up</div>
                            <LocationDateReserve
                                onDateChange={(value: Dayjs) => setPickupDate(value)}
                                onLocationChange={(value: string) => setPickupLocation(value)}
                                // preset={{date:pickupDate, location: pickupLocation}}
                            />
                            <div className="text-md text-left text-gray-600">Return</div>
                            <LocationDateReserve
                                onDateChange={(value: Dayjs) => setReturnDate(value)}
                                onLocationChange={(value: string) => setReturnLocation(value)}
                                // preset={{date:returnDate, location: returnLocation}}
                            />
                        </div>
                    </div>}
                        
            <button
                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white place-self-center"
                onClick={()=>{
                    if(pickupDate && returnDate && pickupLocation && returnLocation)
                        handlePutRequest(pickupDate, returnDate, pickupLocation, returnLocation)
                    else alert("please fill the foem correctly")}}
            >
                Update Booking
            </button>
        </main>
    )
}