import mysql from 'mysql'

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "MeU"
});



export {con as db}