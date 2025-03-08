// models/Review.js
module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      userId: { type: DataTypes.UUID, allowNull: false },
      productId: { type: DataTypes.UUID, allowNull: false },
      rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
      comment: { type: DataTypes.TEXT, allowNull: false },
    });
  
    Review.associate = (models) => {
      Review.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Review.belongsTo(models.Product, { foreignKey: "productId", as: "product" });
    };
  
    return Review;
  };
  