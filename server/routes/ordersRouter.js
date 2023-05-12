import { Router } from "express";
import {
  addOrdersInHistory,
  addOrdersInCurrent,
  fecthOrders,
  fetchOrdersInHistory
} from "../controller/ordersController.js";
import tokenParser from "../middleware/tokenParser.js";

const router = new Router();

router.post("/add-orders", tokenParser, addOrdersInHistory);
router.get("/fetch-orders", tokenParser, fetchOrdersInHistory);
router.post("/current-orders/add", tokenParser, addOrdersInCurrent);
router.post("/fetch", tokenParser, fecthOrders);

export default router;
