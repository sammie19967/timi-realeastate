// app/api/brands/route.js

import { connectDB } from '@/lib/dbConnect';
import Brand from '@/models/Brand';

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('category'); // Get the category ID from query parameters

  try {
    let brands;

    if (categoryId) {
      // Filter brands by category
      brands = await Brand.find({ category: categoryId }).populate('category');
    } else {
      // Fetch all brands if no category is provided
      brands = await Brand.find().populate('category');
    }

    return new Response(JSON.stringify(brands), { status: 200 });
  } catch (error) {
    console.error('Error fetching brands:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch brands' }), { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  const { name, category } = await req.json();

  if (!name || !category) {
    return new Response(JSON.stringify({ error: 'Brand name and category are required' }), { status: 400 });
  }

  const newBrand = new Brand({ name, category });
  await newBrand.save();

  return new Response(JSON.stringify(newBrand), { status: 201 });
}

export async function PUT(req) {
  await connectDB();
  const { id, name, category } = await req.json();

  const updatedBrand = await Brand.findByIdAndUpdate(
    id,
    { name, category },
    { new: true }
  );
  return new Response(JSON.stringify(updatedBrand), { status: 200 });
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();

  const deletedBrand = await Brand.findByIdAndDelete(id);
  return new Response(JSON.stringify(deletedBrand), { status: 200 });
}
