// models/Order.js
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      customerId: { type: DataTypes.UUID, allowNull: false },
      totalAmount: { type: DataTypes.FLOAT, allowNull: false },
      status: { type: DataTypes.ENUM("pending", "completed", "canceled"), defaultValue: "pending" },
    });
  
    Order.associate = (models) => {
      Order.belongsTo(models.User, { foreignKey: "customerId", as: "customer" });
      Order.belongsToMany(models.Product, { through: "OrderItems", foreignKey: "orderId" });
    };
  
    return Order;
  };
  