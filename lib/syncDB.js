const sequelize = require("./config/database");
const { Listing, RealEstate, Vehicle, Electronics, Location, Vendor } = require("../lib/models");

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use {force: true} to reset tables
    console.log("✅ Database synced successfully!");
  } catch (error) {
    console.error("❌ Database sync error:", error);
  }
};

syncDatabase();

