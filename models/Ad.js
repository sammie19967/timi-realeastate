// models/Ad.js
import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  images: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: String, required: true },
  brand: { type: String },
  condition: { type: String, enum: ['New', 'Used', 'Refurbished'] },
  location: {
    county: String,
    subcounty: String
  },
  deliveryMethod: String,
  paymentMethod: String,
  adType: { type: String, enum: ['Free', 'Featured', 'Premium'], default: 'Free' },
  adDuration: String,
  adStatus: { type: String, enum: ['Pending', 'Active', 'Expired'], default: 'Pending' },
  views: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.models.Ad || mongoose.model('Ad', AdSchema);