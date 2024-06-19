const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const itemSchema = new Schema({
    _id: String,
    name: String,
    price: Number,
    quantity: Number,
    total: Number
});
const orderSchema = new Schema({
    name: String,
    email: String,
    address: String,
    total: Number,
    status: Number, // 0: Chờ xác nhận, 1: Đang giao, 2: Đã giao, 3: Đã hủy 
    CTHD: [itemSchema],
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('orders', orderSchema, 'orders');