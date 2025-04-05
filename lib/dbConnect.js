import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    console.log('Using existing database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Establishing new database connection...');
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then((mongoose) => {
      console.log('Database connection established successfully');
      return mongoose;
    }).catch((error) => {
      console.error('Database connection failed:', error.message);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
