const express = require("express");
const path = require("path");
const fs = require("fs");
// const util = require("util");
// const db = require("./db/db.json");
// const uuid = require("./helpers/uuid");
const cTable = require("console.table");
const mysql = require("mysql2");
// require("./index.js");

const PORT = 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  // console.log(`Server running on port ${PORT}`);
});
/*
console.table demo

const table = cTable.getTable([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);

console.log(table);

// prints
name  age
----  ---
foo   10
bar   20
*/
