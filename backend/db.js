const mongodb = require("mongodb");
require("dotenv").config();

const MongoClient = mongodb.MongoClient;
const mongoDbUrl = process.env.MONGO_DB_URL;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("Database is already initialized");
    return callback(null, _db);
  }
  MongoClient.connect(mongoDbUrl)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Database is not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
