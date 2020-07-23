'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable(
    "Likes",

    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      isLike: {
        type: Sequelize.BOOLEAN,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNul: false
      },
    }
  );
     
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('Likes');
     
  }
};
