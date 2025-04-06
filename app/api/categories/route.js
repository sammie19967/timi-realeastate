import { connectDB } from '@/lib/dbConnect';
import Category from '@/models/Category';

export async function GET(req) {
  await connectDB();
  const categories = await Category.find();
  return Response.json(categories);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newCategory = await Category.create(data);
  return Response.json(newCategory);
}
export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  const deletedCategory = await Category.findByIdAndDelete(id);
  return Response.json(deletedCategory);
}
export async function PUT(req) {
  await connectDB();
  const { id, name, subcategories } = await req.json();
  const updatedCategory = await Category.findByIdAndUpdate(id, { name, subcategories }, { new: true });
  return Response.json(updatedCategory);
}