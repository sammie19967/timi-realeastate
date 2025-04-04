// models/Brand.js
import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
});

export default mongoose.models.Brand || mongoose.model('Brand', BrandSchema);
