import mongoose from "mongoose";
import "../model/UserSchema";
import "../model/CommentSchema";
import "../model/PostSchema";

const DB_URI = `${process.env.DB_URL}${process.env.DB_NAME}`;

let cached = global.mongoose;

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
