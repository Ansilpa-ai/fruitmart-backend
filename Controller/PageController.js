const userModel = require('../Model/UserModel')
const productModel = require('../Model/ProductModel')
const cartModel = require('../Model/CartModel')
const bcrypt = require('bcrypt')
const path = require('path')

const RegUser = async(req,res)=>{
    try{
        const {username,email,password} = req.body
        const userExist = await userModel.findOne({email:email})
        if(userExist){
            res.json("UserExist")
        }
        else{
            const salt = 10
            const hashpassword = await bcrypt.hash(password,salt)
            const user = await new userModel({
                username,
                email,
                password:hashpassword,
                role:"user"
            })
            user.save()
            console.log(user)
            res.json("User Added Successfully")
        }
    }
    catch(err){
      console.log("Error",err)
    }
}

const Login = async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await userModel.findOne({email:email})
        
        if(user){
            if ( await bcrypt.compare(String(password),String(user.password))){
                res.json({msg:"Login Successful",role:user.role,status:200,id:user._id,username:user.username})
                 console.log("User found:",user)
            }
            else{
                res.json({msg:"Wrong Password",status:400})
            }
        }
        else{
            console.log("No user found")
        }
    }
    catch(err){
        console.log("Error",err)
    }
}

const addProduct = async(req,res)=>{
    try{
    const {productname,price,quantity,category} = req.body
    const image = req.files.map((file)=>file.path)
    // const image  = req.file ? req.file.filename : null ;
    const product = new productModel({
        productname,
        price,
        quantity,
        image,
        category
    })
   await product.save()
    console.log(product)
    res.json("Product Added Successfully")
    }
    catch(err){
     console.log("Error",err)
     res.status(500).json("Server Error")
    }
}

const viewProduct = async(req,res) =>{
    try{
        const products = await productModel.find({})
        res.json(products)
    }
    catch(err){
        console.log("Error",err)
        res.json("No view")
    }
}

const deleteProduct = async(req,res)=>{
    try{
    const id = req.headers._id
    await productModel.deleteOne({_id:id})
    res.json("Product Deleted")
    }
    catch(err){
      console.log("Error",err)
    }
}
 
const editProduct = async(req,res)=>{
    try{
     const id = req.params.id
     const product = await productModel.findOne({_id:id})
     res.json(product)
     console.log(product)
     console.log(id)
    }
    catch(err){
     console.log("Error",err)
    }
}

const updateProduct = async(req,res)=>{
    try{
     const id = req.params.id
     const {price,quantity,category} = req.body
     await productModel.updateOne({_id:id},{price,quantity,category})
     res.json("Product Updated")
    }
    catch(err){
        res.status(500).json("Server Error")
    }
}

const addCart = async(req,res)=>{
    try{
     const userId = req.params.id
    const {productId,quantity} = req.body

    let cartItem = await cartModel.findOne({userId,productId})
    
    if(cartItem){
        cartItem.quantity += Number(quantity)
        await cartItem.save()
        return res.status(200).json({message:"Updated existing item",data:cartItem})
        }
        
       const newItem = new cartModel({userId,productId, quantity: Number(quantity)});
        await newItem.save()
        res.status(200).json({message:"Added new item",data:newItem})
    }
    catch(err){
      console.log("Error",err)
     res.status(500).json({message:"Error adding to cart"})
    }
}



const viewCart = async(req,res) =>{

    try{
    const userId = req.params.id
    
     const items = await cartModel.find({userId}).populate("productId")
     
        res.status(200).json({message:"Cart loaded",data:items})
       }
    catch(err){
      console.log("Error",err)
      res.status(400).json({message:"Error loading cart"})
    }
}


// Update Cart Quantity

const updateCartQuantity = async(req,res) =>{
    try{
        const {cartId,quantity} = req.body
        const cartItem = await cartModel.findById(cartId)
         if(!cartItem){
            return res.status(404).json({message:"cart item not found"})
         }
        
         if(quantity <= 0){
            await cartModel.findByIdAndDelete(cartId)
            return res.status(200).json({message:"Item removed (qty=0)"})
         }
         cartItem.quantity = quantity
         await cartItem.save()

         res.status(200).json({message:"Quantity uploaded",cartItem})
    }
    catch(err){
        console.log("Error updating quantity:",err)
        res.status(500).json({message:"Server Error"})
    }
}








module.exports = {RegUser,Login,addProduct,viewProduct,deleteProduct,
                   editProduct,updateProduct,
                   addCart,viewCart,
                   updateCartQuantity}