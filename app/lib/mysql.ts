// app/lib/mysql.ts
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost', // from DATABASE_URL
  user: 'root',      // from DATABASE_URL
  password: '',      // empty as per DATABASE_URL
  database: 'verceldb', // from DATABASE_URL
});

export default pool;
