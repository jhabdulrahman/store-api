const getAllProductsStatic = (req, res) => {
    res.status(200).json({ msg: 'products static route' });
}

const getAllProducts = (req, res) => {
    res.status(200).json({ msg: 'products route' });
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
};