import { Listing } from "@/lib/models";
import sequelize from "@/lib/config/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { category, location, priceMin, priceMax, saleType } = req.query;
      const where = {};

      if (category) where.category = category;
      if (location) where.location_id = location;
      if (priceMin) where.price = { [sequelize.Sequelize.Op.gte]: priceMin };
      if (priceMax) where.price = { [sequelize.Sequelize.Op.lte]: priceMax };
      if (saleType) where.saleType = saleType;

      const listings = await Listing.findAll({ where });

      res.status(200).json(listings);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
}
