const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Ensure correct path

// Import models and pass sequelize instance & DataTypes
const User = require("./User")(sequelize, DataTypes);
const Product = require("./Product")(sequelize, DataTypes);
const Order = require("./Order")(sequelize, DataTypes);
const Review = require("./Review")(sequelize, DataTypes);
const Wishlist = require("./Wishlist")(sequelize, DataTypes);
const Subscription = require("./Subscription")(sequelize, DataTypes);

// Associations
User.hasMany(Product, { foreignKey: "vendorId", as: "products" });
Product.belongsTo(User, { foreignKey: "vendorId", as: "vendor" });

User.hasMany(Order, { foreignKey: "customerId", as: "orders" });
Order.belongsTo(User, { foreignKey: "customerId", as: "customer" });

Product.belongsToMany(Order, { through: "OrderItems", foreignKey: "productId" });
Order.belongsToMany(Product, { through: "OrderItems", foreignKey: "orderId" });

User.hasMany(Review, { foreignKey: "userId", as: "reviews" });
Review.belongsTo(User, { foreignKey: "userId", as: "user" });

Product.hasMany(Review, { foreignKey: "productId", as: "reviews" });
Review.belongsTo(Product, { foreignKey: "productId", as: "product" });

User.hasMany(Wishlist, { foreignKey: "userId", as: "wishlist" });
Wishlist.belongsTo(User, { foreignKey: "userId", as: "user" });

Product.hasMany(Wishlist, { foreignKey: "productId", as: "wishlist" });
Wishlist.belongsTo(Product, { foreignKey: "productId", as: "product" });

User.hasOne(Subscription, { foreignKey: "vendorId", as: "subscription" });
Subscription.belongsTo(User, { foreignKey: "vendorId", as: "vendor" });

// Sync models with the database
/*sequelize
  .sync({ alter: true }) // `alter: true` updates tables without data loss
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error("Error syncing database:", err));*/

module.exports = { sequelize, User, Product, Order, Review, Wishlist, Subscription };
