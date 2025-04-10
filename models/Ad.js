import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  condition: String,
  category: String,
  categoryName: String,
  subcategory: String,
  brand: String,
  brandName: String,
  location: {
    country: String,
    county: String,
    subcounty: String,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Ad || mongoose.model('Ad', AdSchema);
