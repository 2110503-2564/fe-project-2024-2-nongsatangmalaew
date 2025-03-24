import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReservationItem } from '../../../interface'

type CartState = {
    carItems: ReservationItem[]
}
const initialState: CartState = { carItems: [] }

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addReservation: (state, action: PayloadAction<ReservationItem>) => {
            if (state.carItems.length < 3) {
                state.carItems.push(action.payload);
            } else{
                alert("Hey! You can only add up to 3 cars to the cart.")
            }
        },
        removeReservation: (state, action: PayloadAction<ReservationItem>) => {
            const remainItems = state.carItems.filter(obj => {
                return ((obj.carModel !== action.payload.carModel)
                    || (obj.pickupDate !== action.payload.pickupDate)
                    || (obj.returnDate !== action.payload.returnDate));
            })
            state.carItems = remainItems
        },
        editReservation: (state, action: PayloadAction<{ oldItem: ReservationItem; newItem: Partial<ReservationItem> }>) => {
            const { oldItem, newItem } = action.payload;
        
            const existingItem = state.carItems.find(obj =>
                obj.carModel === oldItem.carModel &&
                obj.carId === oldItem.carId
            );
        
            if (existingItem) {
                Object.assign(existingItem, newItem); // ✅ Modify existing object in-place
            } else {
                console.warn("editReservation: Reservation not found!", oldItem);
            }
        }
        
        
        
    }
})

export const { addReservation, removeReservation,editReservation } = cartSlice.actions
export default cartSlice.reducer