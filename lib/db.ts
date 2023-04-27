// lib/db/dbConnect.ts
import mongoose from "mongoose";

const DB_URI = `${process.env.DB_URL}${process.env.DB_NAME}`;

let cached = global.mongoose;
// FIXME

// global.mongoose가 없으면 initialize.
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/* 
global.mongoose객체에 있는 conn이 있으면 그걸 사용한다.


*/

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .set({ debug: true, strictQuery: false })
      .connect(`${DB_URI}`)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  console.log("connected to mongodb");

  return cached.conn;
}

export default dbConnect;

// import { MongoClient } from "mongodb";

// const uri = `mongodb://localhost:27017/${process.env.DBNAME}`;
// const client = new MongoClient(uri, {});

// export async function connectToDatabase() {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB!");
//   } catch (err) {
//     console.log("Unable to connect to MongoDB:", err);
//   }
// }

// export default async function handler(req, res) {
//   const database = client.db("mydb");
//   const collection = database.collection("mycollection");
//   const result = await collection.find({}).toArray();
//   res.json(result);
// }
