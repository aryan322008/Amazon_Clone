import { Router } from "express";
import { getItem } from "../controller/itemController.js";

const router = new Router();

router.get("/getItem", getItem)


export default router