import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import session from "express-session";
import dotenv from "dotenv";
import db from "../../config/db.js"; // Importing the existing database connection pool

dotenv.config();

const router = express.Router();
const saltRounds = 10;

router.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(passport.initialize());
router.use(passport.session());

// Passport Local Strategy for authentication
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const result = await db.query("SELECT * FROM users WHERE email = $1", [username]);
            if (result.rows.length === 0) {
                return done(null, false, { message: "Incorrect email or password." });
            }

            const user = result.rows[0];
            const isValid = await bcrypt.compare(password, user.password);

            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Incorrect email or password." });
            }
        } catch (error) {
            return done(error);
        }
    })
);

// Passport Google OAuth2 Strategy for authentication
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/secrets",
            passReqToCallback: true,
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        },
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                const result = await db.query("SELECT * FROM users WHERE email = $1", [profile.email]);
            if (result.rows.length === 0) {
                const newUser = await db.query(
                    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
                        [profile.email, "google"]
                );
                return done(null, newUser.rows[0]);
            } else {
                return done(null, result.rows[0]);
            }
            } catch (error) {
                return done(error);
            }
        }
        )
);

// Serialize and deserialize user information
passport.serializeUser((user, cb) => {cb(null, user);});passport.deserializeUser(async (id, done) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        done(null, result.rows[0]);
    } catch (error) {
        done(error, null);
    }
});

// Routes
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
                [email, hashedPassword]
        );

        req.login(result.rows[0], (err) => {
            if (err) {
                return  res.status(500).json({ message: "Error logging in after registration." });
            }
            res.status(201).json({ message: "Registration successful." });
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user." });
    }
});

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/notes",
        failureRedirect: "/login",
    })
);

router.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/notes",
        failureRedirect: "/login",
    })
);

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
        return res.status(500).json({ message: "Error logging out." });
        }
        res.redirect("/");
    });
});

export default router;