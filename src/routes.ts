import express from 'express';
import {apparelRoutes} from "./components/apparel/apparel.routes";
import {orderRoutes} from "./components/order/order.routes";

export const routes = express.Router();

routes.use(apparelRoutes);
routes.use(orderRoutes);