const express = require("express")
const router = express.Router()
const Cart = require("../Model/CartModel")
const Product = require("../Model/ProductModel")
const {addCart,viewCart} = require("../Controller/PageController")
const cartModel = require("../Model/CartModel")




// increase quantity

router.put("/increase/:id",async(req,res)=>{
    try{
        let item = await Cart.findById(req.params.id)
        if(!item) return res.status(404).send("Item not found")
        
         item.quantity += 1
         await item.save()

         res.send("Quantity increased")
    } catch(err){
        res.status(500).send("Server error")
    }
})

// decrease quantity

router.put("/decrease/:id", async(req,res)=>{
    try{
        let item = await Cart.findById(req.params.id)
        if(!item) return res.status(404).send("Cart item not found")

          if (item.quantity > 1){
            item.quantity -= 1
            await item.save()
          }
          else{
            await Cart.findByIdAndDelete(req.params.id)
          }
          res.send("Quantity updated")
    } catch(err){
        console.log(err)
        res.status(500).send("Server error")
    }
})

// Delete cart item 

router.delete("/delete/:id",async(req,res)=>{
    try{
       const deleted =  await cartModel.findByIdAndDelete(req.params.id)
        if(!deleted){
            return res.status(404).json({message:"Cart item not found"})
        }
        res.status(200).json({message:"Item removed"})
    }
    catch(err){
        console.log("Delete error",err)
        res.status(500).json({message:"Server error"})
    }
})



router.post("/addcart/:id",addCart)
router.get("/viewcart/:id",viewCart)

module.exports = router