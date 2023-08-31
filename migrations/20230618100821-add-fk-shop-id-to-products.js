'use strict';

const tableName = "products";
const columnName = "fk_shop_id";

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "shops",
        key: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(tableName, columnName)
  }
};
