import express, { Request, Response } from "express";
import User from "../models/user";
const jwt = require("jsonwebtoken");
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post("/register", [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({min: 6}),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    user = new User(req.body);
    await user.save();

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET as string, {
        expiresIn: "1d"
    })
    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000
    });
    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});


export default router;