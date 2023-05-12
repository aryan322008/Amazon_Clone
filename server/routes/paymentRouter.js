import { Router } from "express";
import {payment} from "../controller/paymentController.js";
import tokenParser from "../middleware/tokenParser.js";

const router = new Router();

router.post("/create", payment)

export default router