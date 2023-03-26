import express from 'express';
import { getProducts, saveProduct } from '../controllers/productsController.js';
const productsRouter = express.Router();

productsRouter.get('/', getProducts);
productsRouter.post('/', saveProduct);

export default productsRouter;
