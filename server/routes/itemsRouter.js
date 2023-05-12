import { Router } from "express";
import {
  getItem,
  addItem,
  addCartItem,
  getCartItem,
  deleteCartItem,
  updateCartItem,
  myProducts,
  delete_my_products
} from "../controller/itemController.js";
import tokenParser from "../middleware/tokenParser.js";
import { body } from "express-validator";

const router = new Router();

router.get("/getItem", getItem);

router.get("/my-products",tokenParser, myProducts);

router.post("/addItem", 
  [
    body("title").isLength({ min: 100 }).withMessage("title Too Short"),
    body("description").isLength({ min: 500 }).withMessage("description Too Short"),
    body("price").isInt({ min:50, max: 100000}).withMessage("price under 50 or less than a lakh is acceptable"),
    body("ageRating").isInt({ min:1, max: 18}).withMessage(" Age rating should be in range of 1-18"),
    body("image").notEmpty().withMessage("image need to be added "),  
] ,tokenParser, addItem);

router.post("/my-products/delete/:id", tokenParser, delete_my_products);

router.post("/addCartItem", tokenParser, addCartItem);

router.get("/getCartItems", tokenParser, getCartItem);

router.post("/updateCartItem", tokenParser, updateCartItem);

router.post("/deleteCartItem/:id", tokenParser, deleteCartItem);
export default router;
