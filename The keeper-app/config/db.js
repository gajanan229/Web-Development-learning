import pg from "pg";
const { Pool } = pg;
import env from "dotenv";

env.config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

export const connectDB = async () => {
    try {
        await pool.connect();
        console.log("Connected to the PostgreSQL database.");
    } catch (err) {
        console.error("Database connection error:", err.message);
        process.exit(1);
    }
};

export default pool;