const mongoose  = require("mongoose")

const OrderSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user_table"},
    items:[
        {
            productId:{ type:mongoose.Schema.Types.ObjectId,ref:"product_table"},
            quantity:Number,
            price:Number
        }
    ],
    totalAmount:Number,
    address:{
     name:"String",
     email:"String",
     phone:"String",
     pincode:"String",
     place:"String",
     fulladdress:"String"
    },
    status:{
        type:String,
        default:"Pending"
    }
},{timestamps:true})

module.exports = mongoose.model("order_table",OrderSchema)