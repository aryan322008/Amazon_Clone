import userModal from "../models/userModal.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import uniqid from "uniqid";
import nodemailer from "nodemailer";
import { google } from "googleapis";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

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

      const token = jwt.sign(userTokenObj, process.env.JWT_SECRET);

      res.send({ token, email: user.email });
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

    const token = jwt.sign(userTokenObj, process.env.JWT_SECRET);

    res.send({ adminId: adminId, token, email: user.email });
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

      const token = jwt.sign(userTokenObj, process.env.JWT_SECRET);

      if (admin) {
        const adminId = uniqid();

        const hashedId = bcrypt.hashSync(adminId, salt);

        const updatedUser = await userModal.findByIdAndUpdate(user.id, {
          admin_id: hashedId,
        });

        res.send({adminId: adminId,token, email: updatedUser.email });
      } else {
        res.send({ token, email: user.email });
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

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  try {
    const user = await userModal.findOne({ email });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!user) {
      return res.status(404).json({ errors: [{ msg: "user doesn't exists" }] });
    }

    const verification_code = uniqid();

    const verification_code_obj = {
      code: verification_code,
    };

    const hashedCode = bcrypt.hashSync(verification_code, salt);

    const updatedUser = await userModal.findByIdAndUpdate(user._id, {
      verification_code: hashedCode,
    });


    const oauth2Client = new google.auth.OAuth2(
      process.env.YOUR_CLIENT_ID,
      process.env.YOUR_CLIENT_SECRET,
      process.env.YOUR_REDIRECT_URL
    );

    oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "aryangavale32@gmail.com",
        clientId: process.env.YOUR_CLIENT_ID,
        clientSecret: process.env.YOUR_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: '"LocalHoast" <aryangavale32@gmail.com>',
      to: `${email}`,
      subject: "Verifiy",
      text: "verify your email",
      html: `<b>${verification_code}</b>`,
    };

    const info = await transporter.sendMail(mailOptions);

    res.send({ userEmailSent: true });
  }
  catch (error) {
    res.status(404).json({ errors: [{ msg: "Internal Error" }] });
  }
};



const resetPassword = async (req, res) => {
  const { veriCode, newPass, email } = req.body;

  const user = await userModal.findOne({ email });
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!user) {
    return res.status(404).json({ errors: [{ msg: "user doesn't exists" }] });
  }

  try {
    const userVeriCodeCheck = bcrypt.compareSync(
      veriCode,
      user.verification_code
    );

    if (userVeriCodeCheck) {
      const hashedPassword = bcrypt.hashSync(newPass, salt);

      const updated_user = await userModal.findByIdAndUpdate(user._id, {
        password: hashedPassword,
      });

      res.send({ passwordchanged: true });
    } else {
      return res
        .status(404)
        .json({ errors: [{ msg: "invalid Verification Code" }] });
    }
  } catch (error) {
    res.status(404).json({ errors: [{ msg: "Internal Error" }] });
  }
};

export { register, login, checkAdmin, forgotPassword, resetPassword };
