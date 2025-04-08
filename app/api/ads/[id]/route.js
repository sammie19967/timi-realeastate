import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConnect';
import Ad from '@/models/Ad';
import mongoose from 'mongoose';

export async function GET(_, context) {
  try {
    await connectDB();

    const { params } = context;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ad ID' }, { status: 400 });
    }

    const ad = await Ad.findById(id)
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

export async function PUT(req, context) {
  try {
    await connectDB();

    const { params } = context;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ad ID' }, { status: 400 });
    }

    const body = await req.json();
    const updatedAd = await Ad.findByIdAndUpdate(id, body, { new: true });

    if (!updatedAd) {
      return NextResponse.json({ error: 'Ad not found for update' }, { status: 404 });
    }

    return NextResponse.json(updatedAd);
  } catch (error) {
    console.error('Error updating ad:', error.message);
    return NextResponse.json({ error: 'Failed to update ad' }, { status: 500 });
  }
}

export async function DELETE(_, context) {
  try {
    await connectDB();

    const { params } = context;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ad ID' }, { status: 400 });
    }

    const deletedAd = await Ad.findByIdAndDelete(id);

    if (!deletedAd) {
      return NextResponse.json({ error: 'Ad not found for deletion' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Ad deleted successfully' });
  } catch (error) {
    console.error('Error deleting ad:', error.message);
    return NextResponse.json({ error: 'Failed to delete ad' }, { status: 500 });
  }
}
