// pages/api/products/filter.js
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to the database
    await dbConnect();
    
    // Get query parameters from the request
    const {
      search,
      minPrice,
      maxPrice,
      location,
      brand,
      listingType,
      sortBy,
      page = 1,
      limit = 10
    } = req.query;
    
    // Start building our filter query
    const query = {};
    
    // Add search filter if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Add price range filter if provided
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // Add location filter if provided
    if (location) {
      query['location.county'] = location;
    }
    
    // Add brand filter if provided
    if (brand) {
      query.brand = brand;
    }
    
    // Add listing type filter if provided
    if (listingType) {
      query.listingType = listingType;
    }
    
    // Determine how to sort the results
    let sort = {};
    switch (sortBy) {
      case 'price_asc':
        sort = { price: 1 };
        break;
      case 'price_desc':
        sort = { price: -1 };
        break;
      case 'newest':
        sort = { createdAt: -1 };
        break;
      case 'popular':
        sort = { views: -1 };
        break;
      default:
        sort = { createdAt: -1 }; // Default to newest
    }
    
    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    // Fetch the filtered products
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));
    
    // Count total matching products for pagination
    const total = await Product.countDocuments(query);
    
    // Return the results
    res.status(200).json({
      products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}