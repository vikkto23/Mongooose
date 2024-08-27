import Product from '../models/productModel.js';

const createProduct = async (req, res) => {
    try {
        const { productName, description, price } = req.body;
        const product = new Product({ productName, description, price });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

export { createProduct };
