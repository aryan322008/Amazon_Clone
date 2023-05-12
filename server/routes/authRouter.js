import { Router } from "express";
import { register, login, checkAdmin } from "../controller/authController.js";
import { body } from "express-validator";
import tokenParse from "../middleware/tokenParser.js"

const router = new Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({ min: 8 }).withMessage("Password Too Short"),
    body("name").isLength({ min: 6 }).withMessage("Username Too Short"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({ min: 8 }).withMessage("Password Too Short"),
  ],
  login
);

router.post("/admin/login", [
  body("adminId").isLength({ min: 3 }).withMessage("wrong credentials"),
], tokenParse ,checkAdmin);

export default router;
