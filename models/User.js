// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['seller', 'admin'], default: 'seller' }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);