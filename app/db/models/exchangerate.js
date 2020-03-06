'use strict';
module.exports = (sequelize, DataTypes) => {
  const exchangeRate = sequelize.define(
    'exchangeRate',
    {
      currency: DataTypes.STRING,
      spotPurchasePrice: DataTypes.FLOAT,
      purchasePrice: DataTypes.FLOAT,
      spotOfferPrice: DataTypes.FLOAT,
      cashOffer: DataTypes.FLOAT,
      bankofChinadiscountedPrice: DataTypes.FLOAT,
      releaseDate: DataTypes.STRING,
      releaseTime: DataTypes.STRING
    },
    {}
  );
  exchangeRate.associate = function(models) {
    // associations can be defined here
  };
  return exchangeRate;
};
