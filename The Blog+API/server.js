import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";

// Initialize Express app and environment variables
const app = express();
const port = 3000;
const saltRounds = 10;
const API_URL = "http://localhost:4000";
env.config();

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Serve static files from the "public" directory
app.use(express.static("public"));

// Configure body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Configure PostgreSQL database connection
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

// Define routes for rendering pages
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Google authentication routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/posts",
  passport.authenticate("google", {
    successRedirect: "/posts",
    failureRedirect: "/login",
  })
);

// Local authentication routes
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/login",
  })
);

// User registration route
app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      req.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/posts");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// Passport Local Strategy for authentication
passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

// Passport Google OAuth2 Strategy for authentication
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [profile.email, "google"]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// Serialize and deserialize user information
passport.serializeUser((user, cb) => {cb(null, user);});
passport.deserializeUser((user, cb) => {cb(null, user);});

// Protected route to render the main page
app.get("/posts", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      res.render("index.ejs", { posts: response.data, user_id: req.user.id});
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts" });
    }
  } else {
    res.redirect("/login");
  }
});

// Routes for creating and editing posts
app.get("/new", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
  } else {
    res.redirect("/login");
  }
});

app.get("/edit/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
      console.log(response.data);
      res.render("modify.ejs", {
        heading: "Edit Post",
        submit: "Update Post",
        post: response.data,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching post" });
    }
  } else {
    res.redirect("/login");
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const response = await axios.post(`${API_URL}/posts`,{ ...req.body, author_id: req.user.id});
      // console.log(response.data);
      // console.log({ ...req.body, id: req.user.id});
      res.redirect("/posts");
    } catch (error) {
      res.status(500).json({ message: "Error creating post" });
    }
  } else {
    res.redirect("/login");
  }
  
});

// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const response = await axios.patch(
        `${API_URL}/posts/${req.params.id}`,
        req.body
      );
      console.log(response.data);
      res.redirect("/posts");
    } catch (error) {
      res.status(500).json({ message: "Error updating post" });
    }
  } else {
    res.redirect("/login");
  }
});

// Delete a post
app.get("/api/posts/delete/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      await axios.delete(`${API_URL}/posts/${req.params.id}`);
      res.redirect("/posts");
    } catch (error) {
      res.status(500).json({ message: "Error deleting post" });
    }
  } else {
    res.redirect("/login");
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
