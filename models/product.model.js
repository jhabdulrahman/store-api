const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Product name is required'] },
    price: { type: Number, required: [true, 'Product price is required'] },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5 },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
    },
    price: { type: Number, required: [true, 'Product price is required'] },
    createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Product', productsSchema);