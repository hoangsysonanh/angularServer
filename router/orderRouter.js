const express = require('express');
const app = express.Router();
const orderSchema = require('../model/order/order');
const authenticate = require('./authenticate');
const sendEmail = require('../router/sendMail');
// app.post('/order', authenticate, async (req, res) => {
//   try {
//     const status = 0;
//     const { name, total, items } = req.body;
//     const order = new orderSchema({
//       name,
//       total,
//       status,
//       CTHD: items
//     });
//     console.log('order:', order.status);
//     await order.save();
//     res.status(201).json(order);
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
app.get('/order', async (req, res) => {
  try {
    const orders = await orderSchema.find();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/order', authenticate,async (req, res) => {
  try {
    const { name, email, address, total, items } = req.body;
    const order = new orderSchema({
      name,
      email,
      total,
      address,
      CTHD: items,
      status: 0,
    });
    // console.log('order:', order);
    await order.save();
    console.log(email, order._id);
    // Gửi email xác nhận đơn hàng cho khách hàng
    await sendEmail(email, order._id);

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/order/:id' , async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderSchema.findById(id);
    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/order/:id', async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/order/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await orderSchema.findByIdAndDelete(id);
    res.json({ message: 'Delete order successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = app   