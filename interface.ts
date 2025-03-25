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


export interface ReservationJson {
  success: boolean,
  count:number,
  data: CarItem[]
}

// must edit

export interface CarItem {
  _id: string,

  name:string,
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

// export interface BookingItem {
//   nameLastname: string;
//   tel: string;
//   car: string;
//   bookDate: string;

// }
export interface BookingItem {
  _id?: string
  carId: string
  carModel: string
  numOfDays: number
  pickupDate: string
  pickupLocation: string
  returnDate: string
  returnLocation: string
  user?: string
  car?: CarItem
}

export interface BookingJson {
  success: boolean,
  count: number,
  data: BookingItem[]
}
export interface BookingJson1 {
  success: boolean,
  count: number,
  data: BookingItem
}


export interface User {
  _id: string
  name: string
  tel: string
  email: string
  address: string
  role: string
}

export interface UserJson {
  success: boolean,
  count: number,
  data: User
}

interface LayoutProps {
  children?: React.ReactNode;
  dashboard?: React.ReactNode;
  manage?: React.ReactNode;
}
