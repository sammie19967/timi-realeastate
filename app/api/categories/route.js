//api/categories

import { connectDB } from '@/lib/dbConnect';
import Category from '@/models/Category';
import { NextResponse } from 'next/server';
import "@/styles/adForm.css"; // Import your CSS file

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); // Get the category ID from query parameters

  if (id) {
    // Fetch category by ID
    try {
      const category = await Category.findById(id);
      if (!category) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
      return NextResponse.json(category, { status: 200 }); // Return JSON
    } catch (error) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }
  }

  // Fetch all categories if no ID is provided
  const categories = await Category.find();
  return NextResponse.json(categories, { status: 200 }); // Return JSON
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newCategory = await Category.create(data);
  return NextResponse.json(newCategory, { status: 201 }); // Return JSON
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory) {
    return NextResponse.json({ error: 'Category not found for deletion' }, { status: 404 });
  }
  return NextResponse.json(deletedCategory, { status: 200 }); // Return JSON
}

export async function PUT(req) {
  await connectDB();
  const { id, name, subcategories } = await req.json();
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { name, subcategories },
    { new: true }
  );
  if (!updatedCategory) {
    return NextResponse.json({ error: 'Category not found for update' }, { status: 404 });
  }
  return NextResponse.json(updatedCategory, { status: 200 }); // Return JSON
}
