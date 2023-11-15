const { MongoClient } = require("mongodb");

// const uri = "mongodb://127.0.0.1:27017";
const uri = "mongodb+srv://firosyanammar14:U2UHgoWYkMsG0H6G@cluster0.vnacf3i.mongodb.net/";
const client = new MongoClient(uri);

let db = {};

async function connect() {
  try {
    //untuk connect
    await client.connect()

    db = client.db('Pandamelan') //ini untuk nama database

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
