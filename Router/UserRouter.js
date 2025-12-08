const express = require('express')
const {RegUser,Login,addProduct,viewProduct,deleteProduct, editProduct, updateProduct,updateCartQuantity,} = require('../Controller/PageController')

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({destination:(req,file,cb)=>{
    cb(null,'uploads/')
},filename:(req,file,cb)=>{
    cb(null,Date.now()+path.extname(file.originalname))}
})

const upload = multer({storage:storage})

const Router = express.Router()
Router.route('/register').post(RegUser)
Router.route('/login').post(Login)
Router.route('/addproduct').post(upload.array('image',50),addProduct)
Router.route('/viewproduct').get(viewProduct)
Router.route('/deleteproduct').delete(deleteProduct)
Router.route('/editproduct/:id').get(editProduct)
Router.route('/updateproduct/:id').put(updateProduct)
Router.route('/update').put(updateCartQuantity)


module.exports = Router
