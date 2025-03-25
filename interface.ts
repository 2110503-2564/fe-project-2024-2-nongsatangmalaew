import { StringExpression } from "mongoose"

export interface ReservationItem {
  carId: string
  carModel: string
  numOfDays: number
  pickupDate: string
  pickupLocation: string
  returnDate: string
  returnLocation: string
  pickupProvider: string
}

// must edit

export interface CarItem {
  _id: string,
  model: string,
  address: string,
  district: string,
  province: string,
  postalcode: string,
  tel: string,
  picture: string,
  dailyrate: number,
  __v: number,
  id: string
}

export interface CarsJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: CarItem[]
}

export interface BookingItem {
  nameLastname: string;
  tel: string;
  car: string;
  bookDate: string;
}