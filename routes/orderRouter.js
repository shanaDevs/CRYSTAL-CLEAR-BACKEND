import express from 'express';
import { createOrder, getAllOrders, getOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();
orderRouter.post('/', createOrder);
orderRouter.get('/', getAllOrders);
orderRouter.get('/:id', getOrder);

export default orderRouter;
