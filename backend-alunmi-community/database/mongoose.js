const mongoose = require("mongoose");

const DATABASE_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const DATABASE_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST || 'test';
const DATABASE_PORT = process.env.DATABASE_PORT || 27017; // default port if not set
const DATABASE_NAME = process.env.MONGO_INITDB_DATABASE;

var MongoURL;
if(DATABASE_HOST != 'test'){
  MongoURL =`mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`
}else{
  MongoURL = "mongodb://localhost:27017/alumni"
}
 
console.log(MongoURL)
async function setup() {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(MongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
      authSource: "admin"
    });
    console.log("mongodb is connected");
  } catch (err) {
    console.error(err);
  }
}

module.exports = setup;
