// lib/db.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Pari@2005", // your MySQL password
  database: "pinddaan",
});

export default pool;
