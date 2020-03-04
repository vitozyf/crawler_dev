'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
		const transaction = await queryInterface.sequelize.transaction();
		try {
				await queryInterface.addColumn(
						'HotModels',
						'updatedTime',
						{
								type: Sequelize.DATE,
						},
						{ transaction }
				);
				await transaction.commit();
		} catch (err) {
				await transaction.rollback();
				throw err;
		}
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
		const transaction = await queryInterface.sequelize.transaction();
		try {
				await queryInterface.removeColumn(
						'HotModels',
						'updatedTime',
						{ transaction }
				);

				await transaction.commit();
		} catch (err) {
				await transaction.rollback();
				throw err;
		}
  }
};
