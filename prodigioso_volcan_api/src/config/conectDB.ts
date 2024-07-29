import mongoose from 'mongoose';
const mongoURI = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB_NAME;
export const conectDB = async () => {
  try {
    const db = await mongoose.connect(mongoURI!, {
      dbName
    });

    const url = `${db.connection.host}:${db.connection.port}`;

    if (url) {
      console.log('MongoDB connected');
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
