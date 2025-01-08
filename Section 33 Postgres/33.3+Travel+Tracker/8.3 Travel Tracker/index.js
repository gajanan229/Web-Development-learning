import express from "express";
import bodyParser from "body-parser";
import 'dotenv/config';
import pg from 'pg';

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: "world",
  password: process.env.PGPASS,
  port: 5432
});

const app = express();
const port = 3000;

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs", {total: countries.length, countries: countries});
});

app.post("/add", async (req, res) => {
  const place = req.body["country"];
  try {
    const result = await db.query("SELECT country_CODE FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';", [place.toLowerCase()]);
    const code = result.rows[0].country_code
    try{
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [code]);
      res.redirect("/");
    } 
    catch(err) {
      console.log(err)
      const countries = await checkVisisted();
      res.render("index.ejs", {total: countries.length, countries: countries, error: "Country has already been added, try again."});
    }
  } 
  catch(err){
    console.log(err)
    const countries = await checkVisisted();
    res.render("index.ejs", {total: countries.length, countries: countries, error: "Country name does not exist, try again."});
  }


});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
