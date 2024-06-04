import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = express.Router();

router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
], async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
        }
        
        const token = jwt.sign(
            {userId: user.id}, 
            process.env.JWT_SECRET as string, 
            { expiresIn: 360000 });
            res.cookie("auth_token", token, { 
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 3600000
            })
            res.status(200).json({ message: "Logged in successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong" })
    }
})

export default router