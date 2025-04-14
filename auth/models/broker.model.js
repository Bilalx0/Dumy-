import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const brokerSchema = new mongoose.Schema({
  email: String, 
  username: String, 
  password: String,
  userId: { 
    type: String,
    default: () => uuidv4()
  }
});

const broker = mongoose.model('broker', brokerSchema);
export default broker;