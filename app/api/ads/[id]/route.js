import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConnect'; // Corrected import
import Ad from '@/models/Ad';

export async function GET(_, { params }) {
  try {
    await connectDB(); // Ensure database connection
    const ad = await Ad.findById(params.id)
      .populate('category')
      .populate('subcategory')
      .populate('brand');
    if (!ad) {
      return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
    }
    return NextResponse.json(ad);
  } catch (error) {
    console.error('Error fetching ad:', error.message);
    return NextResponse.json({ error: 'Failed to fetch ad' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB(); // Ensure database connection
    const body = await req.json();
    const updatedAd = await Ad.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedAd) {
      return NextResponse.json({ error: 'Ad not found for update' }, { status: 404 });
    }
    return NextResponse.json(updatedAd);
  } catch (error) {
    console.error('Error updating ad:', error.message);
    return NextResponse.json({ error: 'Failed to update ad' }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectDB(); // Ensure database connection
    const deletedAd = await Ad.findByIdAndDelete(params.id);
    if (!deletedAd) {
      return NextResponse.json({ error: 'Ad not found for deletion' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Ad deleted successfully' });
  } catch (error) {
    console.error('Error deleting ad:', error.message);
    return NextResponse.json({ error: 'Failed to delete ad' }, { status: 500 });
  }
}
