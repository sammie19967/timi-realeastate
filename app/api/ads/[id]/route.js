import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Ad from '@/models/Ad';

export async function GET(_, { params }) {
  try {
    await connectDB();
    const ad = await Ad.findById(params.id).populate('category').populate('subcategory').populate('brand');
    if (!ad) return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
    return NextResponse.json(ad);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const updatedAd = await Ad.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updatedAd);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectDB();
    await Ad.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Ad deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
