import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Category name
  subcategories: [{ type: String }], // Subcategories as an array
  brands: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }] // Brands linked to category
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
