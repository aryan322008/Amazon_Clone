import { Router } from "express";
import tokenParser from "../middleware/tokenParser.js";
import {productDetails} from "../controller/detailsController.js";

const router = new Router();

router.get("/:id", tokenParser , productDetails)


export default router