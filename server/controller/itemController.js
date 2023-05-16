import mongoose from "mongoose";
import itemModal from "../models/itemModel.js";
import userModal from "../models/userModal.js";
import { validationResult } from "express-validator";

const getItem = async (req, res) => {
  const items = await itemModal.find();

  res.send(items);
};

const addItem = async (req, res) => {
  const { image, title, description, price, ageRating, colors } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await userModal.findById(req.user);

    if (!user) {
      return res.status(404).json({ errors: [{ msg: "user not found" }] });
    }

    const createdItem = await itemModal.create({
      image,
      title,
      description,
      price,
      ageRating,
      colors,
      author: user.name,
    });

    const updated_User_Products_Array = await userModal.findByIdAndUpdate(
      req.user,
      {
        $push: {
          my_products: createdItem._id,
        },
      },
      { new: true }
    );

    res.send(createdItem);
  } catch (error) {
    return res.status(404).json({ errors: [{ msg: "internal error" }] });
  }
};

const addCartItem = async (req, res) => {
  const { id, qty } = req.body;

  try {
    const item = await itemModal.findById(id);

    const user = await userModal.findById(req.user);

    if (!item) {
      return res.status(404).json({ message: "item not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    
    const updatedCart = await userModal
      .findByIdAndUpdate(
        req.user,
        {
          $push: {
            cart: { qty: qty || 1, item: id },
          },
        },
        { new: true }
      )
      .populate({
        path: "cart.item",
      });

    res.send(updatedCart.cart);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const getCartItem = async (req, res) => {
  try {
    const user = await userModal.findById(req.user).populate({
      path: "cart.item",
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.send(user.cart);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const deleteCartItem = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userModal.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const updatedCart = await userModal
      .findByIdAndUpdate(
        req.user,
        {
          $pull: {
            cart: { _id: new mongoose.Types.ObjectId(id) },
          },
        },
        { new: true }
      )
      .populate({
        path: "cart.item",
      });

    res.send(updatedCart.cart);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const updateCartItem = async (req, res) => {
  const { id, qty } = req.body;

  try {
    const updateUser = await userModal.updateOne(
      { _id: req.user, "cart._id": id },
      {
        $set: {
          "cart.$.qty": qty,
        },
      }
    );

    const user = await userModal
      .findById(req.user)
      .populate({ path: "cart.item" });

    res.send(user.cart);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const myProducts = async (req, res) => {
  try {
    const user = await userModal.findById(req.user).populate({
      path: "my_products",
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.send(user.my_products);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const delete_my_products = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModal.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const removedItem = await itemModal.findByIdAndDelete(id);

    const updated_User_Products_Array = await userModal
      .findByIdAndUpdate(
        req.user,
        {
          $pull: {
            my_products: new mongoose.Types.ObjectId(id),
          },
        },
        { new: true }
      )
      .populate({
        path: "my_products",
      });

    res.send(updated_User_Products_Array.my_products);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export {
  getItem,
  addCartItem,
  getCartItem,
  deleteCartItem,
  updateCartItem,
  addItem,
  myProducts,
  delete_my_products,
};
