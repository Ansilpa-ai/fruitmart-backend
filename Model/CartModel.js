const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user_table"},
    
    productId:{type:mongoose.Schema.Types.ObjectId,ref:"product_table"},

    quantity:{type:Number, default:1 }
    
})

const cartModel = new mongoose.model('cart_table',cartSchema)

module.exports = cartModel