import express from 'express';
import {
    deleteProduct,
    getProducts,
    saveProduct,
    singleProduct,
    updateProduct,
} from '../controllers/productsController.js';
const productsRouter = express.Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:id', singleProduct);
productsRouter.post('/', saveProduct);
productsRouter.delete('/:id', deleteProduct);
productsRouter.put('/:id', updateProduct);

export default productsRouter;
