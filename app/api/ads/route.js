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
    
    // For multipart/form-data, we need to use formData() instead of json()
    const formData = await req.formData();
    
    // Convert formData to a regular object
    const body = {};
    const images = [];
    
    for (const [key, value] of formData.entries()) {
      // Handle file uploads differently
      if (key === 'images') {
        images.push(value);
      } else {
        body[key] = value;
      }
    }

    // Create a new ad
    const newAd = new Ad({
      title: body.title,
      description: body.description,
      price: parseFloat(body.price),
      // Store both ID and name
      category: body.category,
      categoryName: body.categoryName, // This will be an additional field in your schema
      subcategory: body.subcategory || 'Other',
      brand: body.brand || undefined,
      brandName: body.brandName, // This will be an additional field in your schema
      condition: body.condition,
      location: {
        county: body.county,
        subcounty: body.subcounty
      },
      adType: 'Free', // Default
      adStatus: 'Pending', // Default
      views: 0,
      clicks: 0,
      seller: body.seller,
      // Handle image uploads here - you'll need to save them somewhere and store the paths
      // For example: images: imageUrls
    });

    await newAd.save();

    return new Response(JSON.stringify(newAd), { status: 201 });
  } catch (error) {
    console.error('Error creating ad:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to create ad' }), { status: 500 });
  }
}