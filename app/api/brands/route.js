// app/api/brands/route.js

import { connectDB } from '@/lib/dbConnect';
import Brand from '@/models/Brand';

export async function GET(req) {
  await connectDB();
  const brands = await Brand.find();
  return new Response(JSON.stringify(brands), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const { name } = await req.json();

  if (!name) {
    return new Response(JSON.stringify({ error: 'Brand name is required' }), { status: 400 });
  }

  const newBrand = new Brand({ name });
  await newBrand.save();

  return new Response(JSON.stringify(newBrand), { status: 201 });
}

export async function PUT(req) {
  await connectDB();
  const { id, name } = await req.json();

  const updatedBrand = await Brand.findByIdAndUpdate(id, { name }, { new: true });
  return new Response(JSON.stringify(updatedBrand), { status: 200 });
}

export async function DELETE(req) {
  await connectDB();;
  const { id } = await req.json();

  const deletedBrand = await Brand.findByIdAndDelete(id);
  return new Response(JSON.stringify(deletedBrand), { status: 200 });
}
