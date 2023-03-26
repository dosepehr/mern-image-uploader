import Product from '../models/productsModel.js';

export const getProducts = async (req, res) => {
    try {
        const result = await Product.findAll();
        res.json(result);
    } catch (err) {
        console.log(err);
    }
};
