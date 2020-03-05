'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EnsureStocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      supplierName: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      qty: {
        type: Sequelize.BIGINT
      },
      inventory: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING(50)
      },
      package: {
        type: Sequelize.STRING(50)
      },
      year: {
        type: Sequelize.STRING(50)
      },
      warehouse: {
        type: Sequelize.STRING(50)
      },
      instructions: {
        type: Sequelize.STRING
      },
      quality: {
        type: Sequelize.STRING(200)
      },
      delivery: {
        type: Sequelize.STRING(200)
      },
      price: {
        type: Sequelize.STRING(50)
      },
      qq: {
        type: Sequelize.STRING(20)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EnsureStocks');
  }
};
