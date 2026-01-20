const Product = require('../models/product.model');

const getAllProductsStatic = async(req, res) => {
    const products = await Product.find({});
    res.status(200).json({ products });
}

const getAllProducts = async(req, res) => {
    const { featured, company, name, sort, limit, page, numericFilters } = req.query;
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
    let result = Product.find(queryObject)

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };
        const regEx = /\b(>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = {
                    [operator]: Number(value)
                };
            }
        });
    }

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 23;
    const skip = (pageNumber - 1) * limitNumber;

    result = result.skip(skip).limit(limitNumber);

    const products = await result;
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