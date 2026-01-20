const Product = require('../models/product.model');

const getAllProductsStatic = async(req, res) => {
    const products = await Product.find({});
    res.status(200).json({ products });
}

const getAllProducts = async(req, res) => {
    const { featured, company, name } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }

    const products = await Product.find(queryObject).sort('price');
    console.log(req.query);
    res.status(200).json({ products, nbHits: products.length });
}

const updateProduct = async(req, res) => {
    res.send('Update Product');
}

const deleteProduct = async(req, res) => {
    res.send('Delete Product');
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
    updateProduct,
    deleteProduct
};