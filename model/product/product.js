const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: Number },
    image: { type: String },
    description: { type: String, required: true },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('products', productSchema, 'products');