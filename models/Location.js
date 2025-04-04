// models/Location.js
import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  country: { type: String, required: true },
  counties: [{
    name: { type: String, required: true },
    subcounties: [{ type: String, required: true }]
  }]
});

export default mongoose.models.Location || mongoose.model('Location', LocationSchema);