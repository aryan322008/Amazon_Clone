import userModal from "../models/userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import uniqid from "uniqid";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const SECRET =
  "coding is hard and freelancing with it is the hardest for newbies ";

const register = async (req, res) => {
  const { name, email, password, admin } = req.body;
  const user = await userModal.findOne({ email });
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // if error.isEmpty() is true then run the below,"!" specifies that is it's false then return an error, here not is used for the group of error.isEmpty().

  if (user) {
    return res.status(404).json({ errors: [{ msg: "user already exists" }] });
  }

  try {
    const hash = bcrypt.hashSync(password, salt);

    if (!admin) {
      const user = await userModal.create({
        name,
        email,
        password: hash,
        admin,
      });

      const userTokenObj = {
        id: user.id,
      };

      const token = jwt.sign(userTokenObj, SECRET);

      res.send({ token, email:user.email });
    }

    const adminId = uniqid();

    const hashedId = bcrypt.hashSync(adminId, salt);

    const user = await userModal.create({
      name,
      email,
      password: hash,
      admin,
      admin_id: hashedId,
    });

    const userTokenObj = {
      id: user.id,
    };

    const token = jwt.sign(userTokenObj, SECRET);

    res.send({ adminId: adminId, token, email:user.email });
  } catch (error) {
    res.status(404).json({ errors: [{ msg: "internal error" }] });
  }
};

const login = async (req, res) => {
  const { email, password, admin } = req.body;
  const user = await userModal.findOne({ email });
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!user) {
    return res.status(404).json({ errors: [{ msg: "user doesn't exists" }] });
  }

  try {
    const userPasswordCheck = bcrypt.compareSync(password, user.password);

    if (userPasswordCheck) {
      const userTokenObj = {
        id: user.id,
      };

      const token = jwt.sign(userTokenObj, SECRET);

      if (admin) {
        const adminId = uniqid();

        const hashedId = bcrypt.hashSync(adminId, salt);

        const updatedUser = await userModal.findByIdAndUpdate(user.id, {
          admin_id: hashedId,
        });

        res.send({ adminId: adminId, token, email: updatedUser.email });
      } else {
        res.send({ token, email:user.email });
      }
    } else {
      res.status(404).json({ errors: [{ msg: "invalid credentials" }] });
    }
  } catch (error) {
    res.status(404).json({ errors: [{ msg: "Internal Error" }] });
  }
};

const checkAdmin = async (req, res) => {
  const { adminId } = req.body;
  const user = await userModal.findById(req.user);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!user) {
    return res.status(404).json({ errors: [{ msg: "user doesn't exists" }] });
  }

  try {
    const userAdminIdCheck = bcrypt.compareSync(adminId, user.admin_id);

    if (userAdminIdCheck) {
      res.send({ admin_verified: true });
    } else {
      res.status(404).json({ errors: [{ msg: "invalid credentials" }] });
    }
  } catch (error) {
    res.status(404).json({ errors: [{ msg: "Internal Error" }] });
  }
};

export { register, login, checkAdmin };
