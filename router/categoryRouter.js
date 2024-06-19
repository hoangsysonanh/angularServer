var express = require('express');
var categoryModel = require('../model/category/category');

var app = express.Router();

// create category
app.post('/category/add', async (req, res) => {
    const category = new categoryModel(req.body);
    try {
        await category.save();
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
})

// get all categories
app.get('/category', async (req, res) => {
    const category = await categoryModel.find({});
    try {
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.delete('/category/:id', async (req, res) => {

    try {
        await categoryModel.findByIdAndDelete(req.params.id);
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put('/category/:id', async (req, res) => {
    try {
        await categoryModel.findByIdAndUpdate(req.params.id, req.body);
        res.send();
    } catch (error) {
        res.status(500).send(error)
    }
})
app.get('/category/:id', async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id);
        res.send(category)
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = app