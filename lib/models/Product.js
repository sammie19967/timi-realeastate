// models/Product.js
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      vendorId: { type: DataTypes.UUID, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      category: { type: DataTypes.ENUM("electronics", "realestate", "vehicle"), allowNull: false },
      brand: { type: DataTypes.STRING },
      location: { type: DataTypes.STRING },
      type: { type: DataTypes.ENUM("lease", "cash sale", "rent"), allowNull: false },
      unitsAvailable: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      subscriptionStatus: { type: DataTypes.ENUM("active", "inactive"), defaultValue: "inactive" },
      imageUrls: { type: DataTypes.JSON },
    });
  
    Product.associate = (models) => {
      Product.belongsTo(models.User, { foreignKey: "vendorId", as: "vendor" });
    };
  
    return Product;
  };
  