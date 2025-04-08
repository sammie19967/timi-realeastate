// models/Brand.js
import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Brand name
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category
});

export default mongoose.models.Brand || mongoose.model('Brand', BrandSchema);
