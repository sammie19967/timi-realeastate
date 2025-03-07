const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Listing = sequelize.define("Listing", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false }, // Property Name
  description: { type: DataTypes.TEXT, allowNull: false }, // Property Description
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  category: { type: DataTypes.ENUM("Real Estate", "Vehicles", "Electronics"), allowNull: false },
  location_id: { type: DataTypes.UUID, allowNull: false },
  vendor_id: { type: DataTypes.UUID, allowNull: false },
  images: { type: DataTypes.JSON, allowNull: false }, // Store image paths as JSON array
});

module.exports = Listing;
