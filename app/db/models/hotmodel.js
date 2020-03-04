'use strict';
module.exports = (sequelize, DataTypes) => {
  const HotModel = sequelize.define('HotModel', {
    model: DataTypes.STRING
  }, {});
  HotModel.associate = function(models) {
    // associations can be defined here
  };
  return HotModel;
};