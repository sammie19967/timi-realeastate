import { connectDB } from '@/lib/dbConnect';
import Category from '@/models/Category';

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); // Get the category ID from query parameters

  if (id) {
    // Fetch category by ID
    try {
      const category = await Category.findById(id);
      if (!category) {
        return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
      }
      return new Response(JSON.stringify(category), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Invalid category ID' }), { status: 400 });
    }
  }

  // Fetch all categories if no ID is provided
  const categories = await Category.find();
  return new Response(JSON.stringify(categories), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newCategory = await Category.create(data);
  return new Response(JSON.stringify(newCategory), { status: 201 });
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  const deletedCategory = await Category.findByIdAndDelete(id);
  return new Response(JSON.stringify(deletedCategory), { status: 200 });
}

export async function PUT(req) {
  await connectDB();
  const { id, name, subcategories } = await req.json();
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { name, subcategories },
    { new: true }
  );
  return new Response(JSON.stringify(updatedCategory), { status: 200 });
}
