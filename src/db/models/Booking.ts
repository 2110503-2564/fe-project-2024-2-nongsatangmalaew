import mongoose from "mongoose"
const BookingSchema = new mongoose.Schema({
    pickupDate: {
        type: String,
        required: true
    },
    pickupLocation:{
        type: String,
        required: true
    },
    returnDate:{
        type:String,
        required: true
    },
    returnLocation:{
        type:String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId  ,
        ref:'User',
        required: true
    },
    car: {
        type: mongoose.Schema.ObjectId ,
        ref:'Car',
        required: true
    },
    numberOfDays:{
        type:Number,
        required:true
    },
    assumePrice:{
        type:Number,
        required:true
    },
    carId:{
        type:String,
        required:true
    },
    carModel:{
        type:String,
        required:true
    }
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema)
export default Booking
// _id?: string
//   carId: string
//   carModel: string
//   : number
//   : number
//   : string
//   : string
//  : string
//   : string
//   user?: string
//   car?: CarItem