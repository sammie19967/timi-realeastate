const sequelize = require("./config/database");
require("./server")

const syncDB = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced successfully!");
    process.exit();
  } catch (error) {
    console.error("Error syncing database:", error);
    process.exit(1);
  }
};

syncDB();

