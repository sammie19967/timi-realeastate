// app/api/properties/[id].js
import { db } from '@/lib/db'; // Database connection
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const property = await db.property.findUnique({
      where: { id: parseInt(id) },
      include: {
        vendor: true,
        images: true,
        reviews: true,
      },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}
