import express from 'express';
import { getProducts, saveProduct, singleProduct } from '../controllers/productsController.js';
const productsRouter = express.Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:id', singleProduct);
productsRouter.post('/', saveProduct);

export default productsRouter;
