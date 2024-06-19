const express = require('express');
const productModel = require('../model/product/product')
const categoryModel = require('../model/category/category')
const upload = require('../router/upload')
const app = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
app.post('/product/add', upload.single('image'), async (req, res) => {

    const { name, quantity, price, status, description, categoryId } = req.body;

    // const image = req.file.originalname;
    const image = req.file.filename;

    const data = { name, quantity, price, status, image, description, categoryId }

    console.log(data);

    const product = new productModel(data);
    try {
        await product.save();
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}
)
app.get('/product', async (req, res) => {
    try {
        const products = await productModel.find().populate('categoryId');
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
})
app.get('/product/:id', async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id, req.body).populate('categoryId');
        res.send(product);
    } catch (error) {

    }
})
app.delete('/product/:id', async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
})
app.put('/product/:id', upload.single('image'), async (req, res) => {
    const { name, quantity, price, status, description, categoryId } = req.body;
    const image = req.file.filename;
    const data = { name, quantity, price, status, image, description, categoryId }
    try {
        const product = await productModel.findByIdAndUpdate(req.params.id, data);
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
})
app.get('dmsp', async (req, res) => {
    const categories = await (categoryModel.find({}));
    const dmsp = await Promise.all(categories.map(async (category) => {
        const products = await productModel.find({ categoryId: category._id });
        let sortedProducts = products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        let latestProduct = sortedProducts.slice(0, 5);
        return { _id: category.id, name: category.name, products: latestProduct }
        // return { _id: category._id, name: category.name, products: latestProduct }
    }))
    try {
        res.json(dmsp)
    } catch (error) {
        res.status(500).send(error)
    }
})
app.use('/category/:id/product',async (req, res, next) => {
    categoryId = req.params.id;
    const categoryIdObjectID = new ObjectId(categoryId);
    req.categoryIdObjectID = categoryIdObjectID
    next();
})
app.get('/category/:id/product', async (req, res) => {
    try {
    const products = await productModel.find({ categoryId: req.categoryIdObjectID });
        if (products.length === 0) {
            return res.status(404).json({ message: 'Không có sản phẩm thuộc danh mục này.' });
        }
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = app    