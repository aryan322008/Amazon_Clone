import { Router } from "express";
import { payment, prebuiltPayment } from "../controller/paymentController.js";
import tokenParser from "../middleware/tokenParser.js";

const router = new Router();

router.post("/create", payment);

router.post("/create-checkout-session", tokenParser, prebuiltPayment);

export default router;
