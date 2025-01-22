import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../config/db.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Middleware for validating request body
function validInfo(req, res, next) {
    const { email, password } = req.body;

    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {
        if (![email, password].every(Boolean)) {
            return res.json("Missing Credentials");
        }
        // else if (!validEmail(email)) {
        //     return res.json("Invalid Email");
        // }
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.json("Missing Credentials");
        } 
        // else if (!validEmail(email)) {
        //     return res.json("Invalid Email");
        // }
    }

    next();
}

// Middleware for authorizing JWT tokens
function authorize(req, res, next) {
    const token = req.header("jwt_token");

    if (!token) {
        return res.status(403).json({ msg: "Authorization denied" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload.user; // `user` is set in the payload during token generation
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
}

// JWT generator function
const jwtGenerator = (userId) => {
    const payload = {
        user: {
            id: userId,
        },
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register route
router.post("/register", validInfo, async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length > 0) {
            return res.status(401).json("User already exists!");
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, bcryptPassword]
        );

        const jwtToken = jwtGenerator(newUser.rows[0].id);

        return res.json({ jwtToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Login route
router.post("/login", validInfo, async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Invalid credentials");
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json("Invalid credentials");
        }

        const jwtToken = jwtGenerator(user.rows[0].id);
        return res.json({ jwtToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Verify route
router.post("/verify", authorize, (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export default router;

export {authorize};

