'use strict';
module.exports = (sequelize, DataTypes) => {
  const MainlandChinaIp = sequelize.define(
    'MainlandChinaIp',
    {
      ip: DataTypes.STRING
    },
    {}
  );
  MainlandChinaIp.associate = function(models) {
    // associations can be defined here
  };
  return MainlandChinaIp;
};
