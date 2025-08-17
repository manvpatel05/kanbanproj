import express from "express";
import db from "../config/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router();
const SALT_ROUNDS = 10;

router.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;
    if (!(username && email && password)) {
        return res.status(400).json({ error: "Please fill out all fields" });
    }
    try {
        // do after making schema
    } catch (err) {
        console.log(`ERROR: ${err}`);
        return res.status(500).json({ error: "Server error" })
    }
})


export default router;