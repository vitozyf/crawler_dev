'use strict';
module.exports = (sequelize, DataTypes) => {
  const HotModel = sequelize.define(
    'EnsureStock',
    {
      supplierName: {
        type: DataTypes.STRING
      },
      model: {
        type: DataTypes.STRING
      },
      qty: {
        type: DataTypes.BIGINT
      },
      inventory: {
        type: DataTypes.STRING
      },
      brand: {
        type: DataTypes.STRING(50)
      },
      package: {
        type: DataTypes.STRING(50)
      },
      year: {
        type: DataTypes.STRING(50)
      },
      warehouse: {
        type: DataTypes.STRING(50)
      },
      instructions: {
        type: DataTypes.STRING
      },
      quality: {
        type: DataTypes.STRING(200)
      },
      delivery: {
        type: DataTypes.STRING(200)
      },
      price: {
        type: DataTypes.STRING(50)
      },
      qq: {
        type: DataTypes.STRING(20)
      }
    },
    {}
  );
  HotModel.associate = function(models) {
    // associations can be defined here
  };
  return HotModel;
};
