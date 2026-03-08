import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();

/* ========= SIGNUP ========= */
router.post("/signup", async (req, res) => {

  const { name, email, password } = req.body;

  try {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: "Signup successful" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
});

/* ========= LOGIN ========= */
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

export default router;
