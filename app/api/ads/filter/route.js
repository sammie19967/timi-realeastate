// app/api/ads/filter/route.js

import { connectToDatabase } from '@/lib/mongodb';
import Ad from '@/models/Ad';

export async function GET(req) {
  await connectToDatabase();
  const { location, category, subcategory, brand, minPrice, maxPrice } = req.nextUrl.searchParams;

  const filter = {};

  if (location) filter.location = location;
  if (category) filter.category = category;
  if (subcategory) filter.subcategory = subcategory;
  if (brand) filter.brand = brand;
  if (minPrice) filter.price = { $gte: Number(minPrice) };
  if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

  try {
    const ads = await Ad.find(filter);

    if (ads.length === 0) {
      return new Response(JSON.stringify({ message: 'No ads found with the given filters' }), { status: 404 });
    }

    return new Response(JSON.stringify(ads), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch ads with filters' }), { status: 500 });
  }
}
