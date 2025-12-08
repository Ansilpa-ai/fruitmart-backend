const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    productname:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    image:{type:Array,required:true},
    category:{
        type:String,
        required:true
    }
},{timestamps:true})

const productModel = new mongoose.model('product_table',productSchema)

module.exports = productModel