
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || '';
const client = new MongoClient(uri);
let connected = false;

export const getHistoryCollection = async () => {
  if (!connected) {
    await client.connect();
    connected = true;
  }
  return client.db('calculator').collection('history');
};
