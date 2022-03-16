const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('src/database/db.sqlite3'), {fileMustExist: true});

function query(sql, params) {
  try {
    return db.prepare(sql).all(params);
  } catch (error) {
    console.log(error)
    return 
  }
  
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

module.exports = {
  query,
  run
}