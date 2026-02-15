const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

const connectWithRetry = () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("DB not ready. Retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("Connected to MySQL");

      connection.query(`
        CREATE TABLE IF NOT EXISTS employees (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          role VARCHAR(255)
        )
      `);

      connection.release();
    }
  });
};

connectWithRetry();

module.exports = pool;
