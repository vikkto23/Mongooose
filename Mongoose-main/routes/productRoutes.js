import express from 'express';
import { createProduct } from '../controllers/productController.js';
import { authorization } from '../controllers/userController.js';

const router = express.Router();

router.post('/', createProduct);

export default router;
