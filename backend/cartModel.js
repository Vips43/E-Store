import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    product_id:{type:String,required:true},
    quantity:{type:Number,required:true},
    user_id:{type:String,required:true},
})

export default mongoose.model("Cart",cartSchema)