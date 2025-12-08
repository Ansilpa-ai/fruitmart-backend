const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type:String}
},{timestamps:true})

const userModel = new mongoose.model('user_table',userSchema)

module.exports = userModel