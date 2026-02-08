require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/public")));

app.post("/api/add", (req, res) => {
  const { name, role } = req.body;

  db.query(
    "INSERT INTO employees (name, role) VALUES (?, ?)",
    [name, role],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Added");
    }
  );
});

app.get("/api/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
