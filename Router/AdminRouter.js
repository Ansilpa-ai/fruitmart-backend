const express = require('express')
const {
    getDashboardStats,
    getAllUsers,
    getAllOrders,
    getLowStockProducts
} = require('../Controller/AdminController')

const router = express.Router()

router.get('/dashboard',getDashboardStats)
router.get('/users',getAllUsers)
router.get('/orders',getAllOrders)
router.get('/lowstock',getLowStockProducts)

const {createOrder} = require('../Controller/AdminController')
router.post('/order',createOrder)


module.exports = router
 