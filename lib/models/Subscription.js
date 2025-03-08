// models/Subscription.js
module.exports = (sequelize, DataTypes) => {
    const Subscription = sequelize.define("Subscription", {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      vendorId: { type: DataTypes.UUID, allowNull: false },
      status: { type: DataTypes.ENUM("active", "expired"), defaultValue: "active" },
      expiresAt: { type: DataTypes.DATE, allowNull: false },
    });
  
    Subscription.associate = (models) => {
      Subscription.belongsTo(models.User, { foreignKey: "vendorId", as: "vendor" });
    };
  
    return Subscription;
  };
  