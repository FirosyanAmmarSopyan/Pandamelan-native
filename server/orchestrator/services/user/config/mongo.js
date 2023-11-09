const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

let db = {};

async function connect() {
  try {
    //untuk connect
    await client.connect()

    db = client.db('pandamelanDB') //ini untuk nama database

    console.log('Connected successfully to server')
    return db
  } catch (error) {
    console.log(`Error connect config/mongo.js : ` , error);
  }
}

function getDb(){
  return db
}

module.exports = {connect , getDb }
