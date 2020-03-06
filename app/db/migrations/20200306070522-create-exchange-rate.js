'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('exchangeRates', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      currency: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '货币名称'
      },
      spotPurchasePrice: {
        type: Sequelize.FLOAT,
        comment: '现汇买入价'
      },
      purchasePrice: {
        type: Sequelize.FLOAT,
        comment: '现钞买入价'
      },
      spotOfferPrice: {
        type: Sequelize.FLOAT,
        comment: '现汇卖出价'
      },
      cashOffer: {
        type: Sequelize.FLOAT,
        comment: '现钞卖出价'
      },
      bankofChinadiscountedPrice: {
        type: Sequelize.FLOAT,
        comment: '中行折算价'
      },
      releaseDate: {
        type: Sequelize.STRING(20),
        comment: '发布日期'
      },
      releaseTime: {
        type: Sequelize.STRING(20),
        comment: '发布时间'
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
    return queryInterface.dropTable('exchangeRates');
  }
};
