const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost", // Replace with your MySQL host
  user: "root", // Replace with your MySQL username
  password: "password", // Replace with your MySQL password
  database: "digital_wallet", // Replace with your MySQL database name
});

// Connect to the MySQL server
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
    return;
  }
  console.log("Connected to MySQL server");
});

module.exports = connection;
