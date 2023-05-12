import { Router } from "express";
import tokenParser from "../middleware/tokenParser.js";
import {getSearchItems, fetchSearchItems} from "../controller/searchController.js";

const router = new Router();

router.post("/get", tokenParser , getSearchItems)
router.get("/fetch", tokenParser , fetchSearchItems)

export default router