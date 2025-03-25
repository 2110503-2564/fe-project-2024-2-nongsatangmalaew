import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingItem } from '../../../interface';
import dayjs from 'dayjs';  // Import dayjs for date calculations

type CartState = {
  carItems: BookingItem[];
};

const initialState: CartState = { carItems: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      if (state.carItems.length < 3) {
        state.carItems.push(action.payload);
      } else {
        alert("Hey! You can only add up to 3 cars to the cart.");
      }
    },

    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      const remainItems = state.carItems.filter(obj => {
        return (
          obj.carModel !== action.payload.carModel ||
          obj.pickupDate !== action.payload.pickupDate ||
          obj.returnDate !== action.payload.returnDate
        );
      });
      state.carItems = remainItems;
    },
    editBooking: (state, action: PayloadAction<{ oldItem: BookingItem; newItem: Partial<BookingItem> }>) => {
      const { oldItem, newItem } = action.payload;

      const existingItem = state.carItems.find(obj =>
        obj.carModel === oldItem.carModel &&
        obj.carId === oldItem.carId
      );

      if (existingItem) {
        // Update the item with the new data
        Object.assign(existingItem, newItem);

        // Recalculate the duration if either pickupDate or returnDate has changed
        if (newItem.pickupDate || newItem.returnDate) {
          const newPickupDate = newItem.pickupDate ? dayjs(newItem.pickupDate) : dayjs(existingItem.pickupDate);
          const newReturnDate = newItem.returnDate ? dayjs(newItem.returnDate) : dayjs(existingItem.returnDate);

          // Recalculate duration
          const duration = newReturnDate.diff(newPickupDate, 'day');
          existingItem.numOfDays = duration;
        }
        
      } else {
        console.warn("editBooking: Booking not found!", oldItem);
      

      }
    }
  }
});

export const { addBooking, removeBooking, editBooking } = cartSlice.actions;
export default cartSlice.reducer;
