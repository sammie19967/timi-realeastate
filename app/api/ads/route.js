//app/api/ads/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConnect'; // Corrected import
import Ad from '@/models/Ad';

export async function GET(req) {
  try {
    await connectDB(); // Corrected function name

    const { searchParams } = new URL(req.url);

    const filters = {};
    const location = searchParams.get('location');
    const brand = searchParams.get('brand');
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'createdAt_desc';
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    // Filtering
    if (location) filters.location = location;
    if (brand) filters.brand = brand;
    if (category) filters.category = category;
    if (subcategory) filters.subcategory = subcategory;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = parseFloat(minPrice);
      if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
    }

    // Text Search
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: 'i' } }, // Case-insensitive search in title
        { description: { $regex: search, $options: 'i' } } // Case-insensitive search in description
      ];
    }

    // Sorting
    const sortOptions = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
    };

    const sortBy = sortOptions[sort] || sortOptions['newest'];

    // Pagination
    const skip = (page - 1) * limit;

    // Fetch total count and filtered ads
    const total = await Ad.countDocuments(filters);
    const ads = await Ad.find(filters)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .populate('brand category location'); // Populate related fields

    return NextResponse.json({
      data: ads,
      meta: {
        total,
        page,
        pages: Math.ceil(total / limit),
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const body = {};
    const images = [];

    for (const [key, value] of formData.entries()) {
      if (key === 'images') {
        images.push(value); // You'll handle actual upload separately
      } else {
        body[key] = value;
      }
    }

    // Fetch category and brand name using IDs
    let categoryName = '';
    let brandName = '';

    if (body.category) {
      const categoryDoc = await import('@/models/Category').then(mod => mod.default.findById(body.category));
      if (categoryDoc) categoryName = categoryDoc.name;
    }

    if (body.brand) {
      const brandDoc = await import('@/models/Brand').then(mod => mod.default.findById(body.brand));
      if (brandDoc) brandName = brandDoc.name;
    }

    const newAd = new Ad({
      title: body.title,
      description: body.description,
      price: parseFloat(body.price),
      category: body.category,
      categoryName,
      subcategory: body.subcategory || 'Other',
      brand: body.brand || undefined,
      brandName,
      condition: body.condition,
      location: {
        county: body.county,
        subcounty: body.subcounty
      },
      adType: 'Free',
      adStatus: 'Pending',
      views: 0,
      clicks: 0,
      seller: body.seller,
      // images: image paths to be handled
    });

    await newAd.save();

    return new Response(JSON.stringify(newAd), { status: 201 });
  } catch (error) {
    console.error('Error creating ad:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to create ad' }), { status: 500 });
  }
}

