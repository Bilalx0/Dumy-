import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
  email: String, 
  username: String, 
  password: String,
  userId: { 
    type: String,
    default: () => uuidv4()
  }
});

const user = mongoose.model('user', userSchema);
export default user;