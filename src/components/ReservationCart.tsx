"use client";
import { useEffect, useState } from "react";
import { removeReservation, editReservation } from "@/redux/features/cartSlice";
import { useRouter } from "next/navigation";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

// Mock provider data (Replace with a real API if needed)
const providerInfo: Record<string, { address: string; tel: string }> = {
  "Tahto Naju": {
    address: "9/11 ถนนติดสาว ตำบลติดใจ อำเภอติดเธอ นครปฎม 73000",
    tel: "0866199541",
  },
  "WataruEndo": {
    address: "555/69 ถนนหงส์แดง ตำบลได้แชมป์ อำเภอเมือง ขอนแก่น 40000",
    tel: "0914194651",
  },
  "MaxSiraphop": {
    address: "333/20 ถนนยามาล ตำบลเรโพ อำเภออีโก้ สมุทรปราการ 10270",
    tel: "0777777777",
  },
};

export default function ReservationCart() {
  const router = useRouter();
  const carItems = useAppSelector((state) => state.cartSlice.carItems);
  const dispatch = useDispatch<AppDispatch>();

  // Track hydration status to prevent SSR mismatch
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <p>Loading...</p>;

  return (
    <>
      {carItems.map((reservationItem) => {
        const providerDetails =
          providerInfo[reservationItem.pickupProvider] || {
            address: "No address available",
            tel: "No contact available",
          };

        return (
          <div
            className="bg-slate-200 rounded px-5 mx-5 py-2 my-2"
            key={reservationItem.carId}
          >
            <div className="text-xl font-semibold">{reservationItem.carModel}</div>
            <div className="text-sm">
              <span className="font-medium">Provider:</span> {reservationItem.pickupProvider}
            </div>
            <div className="text-sm">
              <span className="font-medium">Address:</span> {providerDetails.address}
            </div>
            <div className="text-sm">
              <span className="font-medium">Tel:</span> {providerDetails.tel}
            </div>
            <div className="text-sm">
              <span className="font-medium">Pick-up:</span> {reservationItem.pickupDate} from {reservationItem.pickupLocation}
            </div>
            <div className="text-sm">
              <span className="font-medium">Return:</span> {reservationItem.returnDate} to {reservationItem.returnLocation}
            </div>
            <div className="text-md font-medium">Duration: {reservationItem.numOfDays} days</div>

            {/* Edit Button */}
            <button
              className="mt-2 block rounded-md bg-blue-600 hover:bg-blue-700 px-3 py-1 text-white shadow-sm"
              onClick={() => {
                dispatch(
                  editReservation({
                    oldItem: reservationItem,
                    newItem: { ...reservationItem },
                  })
                );
                const queryParams = new URLSearchParams({
                  cid: reservationItem.carId,
                  model: reservationItem.carModel,
                }).toString();
                router.push(`/booking/edit?${queryParams}`);
              }}
            >
              Edit Reservation
            </button>

            {/* Remove Button */}
            <button
              className="mt-2 block rounded-md bg-red-600 hover:bg-red-700 px-3 py-1 text-white shadow-sm"
              onClick={() => dispatch(removeReservation(reservationItem))}
            >
              Remove from Cart
            </button>
          </div>
        );
      })}
    </>
  );
}
