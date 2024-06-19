const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
// const muler = require('multer')
const cors = require('cors');
const path = require('path');

const categoryRouter = require('./router/categoryRouter')
const productRouter = require('./router/productRouter')
const userRouter = require('./router/userRouter')
const orderRouter = require('./router/orderRouter')
const app = express()
const port = 3001
// url mongodb
const url = 'mongodb://localhost:27017/angularServer'

// connect to mongodb
mongoose.connect(url)
app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json())
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }))
app.use('/uploads/img', express.static(path.join(__dirname, 'uploads/img')));
app.use(cors());
app.use(categoryRouter)
app.use(productRouter)  
app.use(userRouter)
app.use(orderRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))