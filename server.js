const express = require("express");
const app = express();
const mysql = require("mysql");
const dbConfig = require("./db.config.js");
// one connection
const connection = mysql.createConnection(dbConfig);
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
// simple route
app.get("/", (req, res) => {
    const startTime = (new Date()).getTime();
    connection.query('SELECT ?+? as sum ', [2, 2], (err, rows, fields) => {
        if (err) {
            console.log(err)
            return
        }
        console.log((new Date()).toUTCString(), ' delay is ' + ((new Date()).getTime() - startTime))
        res.send("<h1>Welcome to application. </h1><pre>" + JSON.stringify(rows, null, 2) + '</pre>');
    })
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


