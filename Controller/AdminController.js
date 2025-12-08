const User = require('../Model/UserModel')
const Order = require('../Model/OrderModel')
const Product = require('../Model/ProductModel')
const Cart = require('../Model/CartModel')
const productModel = require('../Model/ProductModel')

exports.getDashboardStats = async(req,res) =>{
    try{
     const users = await User.countDocuments();
      const orders = await Order.countDocuments();
       const products = await Product.countDocuments();
        const lowStockProducts = await Product.find();
       
        const lowStock = lowStockProducts.filter(p=>Number(p.quantity) < 10)
           res.status(200).json({
            users,
            orders,
            products,
            lowStock: lowStock.length
        })
    }
    catch(err){
        res.status(500).json({error:"Server Error"})
    }
}

exports.getAllUsers = async(req,res) =>{
    try{
      const users = await User.find({role:"user"}).sort({createdAt:-1})
      res.status(200).json(users)
    }
    catch(err){
        res.status(500).json({error:"Server Error"})
    }
}

exports.getAllOrders = async(req,res) =>{
    try{
      const orders = await Order.find()
      .populate("userId","username email")
      .populate("items.productId","productname price quantity")
      .sort({createdAt:-1})
      res.status(200).json(orders)
    }
    catch(err){
        res.status(500).json({error:"Server Error"})
    }
}

exports.getLowStockProducts = async(req,res) =>{
    try{
      const products = await productModel.find({quantity:{$lte:10}})
      console.log(products)
      const lowStock = products.map(item =>({
        _id: item._id,
        name:item.productname,
        quantityLeft:item.quantity,
        category:item.category,
        image:item.image
      }))
      console.log(lowStock)
      res.status(200).json(lowStock)
    }
    catch(err){
        res.status(500).json({error:"Server Error"})
    }
}

exports.createOrder = async(req,res)=>{
    try{
     const {userId,items,totalAmount,address} = req.body
     const newOrder = new Order({
        userId,
        items,
        totalAmount,
        address,
        status:"Pending"
     })
     await newOrder.save()
     await Cart.deleteMany({userId})
     res.status(200).json({message:"Order created successfully",order:newOrder})
    }
    catch(err){
     console.log(err)
     res.status(500).json({error:"Server Error"})
    }
}