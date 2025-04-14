import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const adminSchema = new mongoose.Schema({
  email: String, 
  username: String, 
  password: String,
  userId: { 
    type: String,
    default: () => uuidv4()
  }
});

const admin = mongoose.model('admin', adminSchema);
export default admin;