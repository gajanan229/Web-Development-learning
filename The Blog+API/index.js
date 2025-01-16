import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

// Initialize Express application and load environment variables
const app = express();
const port = 4000;
env.config();

// Configure PostgreSQL database connection
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

// Helper function to retrieve all posts from the database
async function checkPosts() {
  const result = await db.query("SELECT * FROM post");
  let countries = result.rows;
  return countries;
}

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to fetch all posts
app.get('/posts', async (req,res) => {
  let posts = await checkPosts();
  res.json(posts);
})

// Route to fetch a specific post by ID
app.get('/posts/:id', async (req,res) => {
  let posts = await checkPosts();
  const id = parseInt(req.params.id);
  const postG = posts.find((post) => post.id === id);
  res.json(postG);
})

// Route to create a new post
app.post('/posts', async (req,res) => {
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;
    const dat = new Date();
    const author_id = req.body.author_id;
  
  try {
    const result = await db.query(
      "INSERT INTO post (title, content, author, date, author_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, content, author, dat, author_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
  }
})

// Route to update specific fields of a post by ID
app.patch('/posts/:id', async (req,res) => {
  const id = req.params.id;
  const result = await db.query("SELECT * FROM post WHERE id=$1", [id]);
  const currPost = result.rows[0];
  const title = req.body.title || currPost.title;
  const content = req.body.content || currPost.content;
  const author = req.body.author || currPost.author;
  const date = new Date();

  try {
    const result = await db.query(
      "UPDATE post SET title = $1, content = $2, author = $3, date = $4 WHERE id=$5 RETURNING *",
      [title, content, author, date, id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
  }
})

// Route to delete a specific post by ID
app.delete('/posts/:id', async (req,res) => {

  try {
    const result = await db.query(
      "DELETE FROM post WHERE id=$1;",
      [req.params.id]
    );
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
  }
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
